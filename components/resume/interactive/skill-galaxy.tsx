'use client';
import { motion } from 'framer-motion';
import type { Skill } from '../resume-view';
import { useMemo, useState, useRef, useEffect } from 'react';
import * as d3 from 'd3-force';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

interface KnowledgeGraphProps {
  skills: Skill[];
}

const KnowledgeGraph = ({ skills }: KnowledgeGraphProps) => {
  const [graph, setGraph] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
  const containerRef = useRef<HTMLDivElement>(null);

  const memoizedData = useMemo(() => {
    if (!skills) return { nodes: [], links: [] };

    const categoryNodes = Array.from(new Set(skills.map(s => s.category))).map(c => ({
      id: c,
      type: 'category',
      radius: 40,
    }));

    const skillNodes = skills.map(s => ({
      id: s.name,
      type: 'skill',
      category: s.category,
      radius: 30,
    }));

    const nodes = [...categoryNodes, ...skillNodes];
    const links = skills.map(s => ({ source: s.name, target: s.category }));

    return { nodes, links };
  }, [skills]);

  useEffect(() => {
    if (memoizedData.nodes.length === 0 || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const simulation = d3.forceSimulation(memoizedData.nodes)
      .force('link', d3.forceLink(memoizedData.links).id((d: any) => d.id).distance(80).strength(0.3))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.radius + 5));

    simulation.on('tick', () => {
      setGraph({ nodes: [...simulation.nodes()], links: [...memoizedData.links] });
    });

    const dragHandler = drag()
      .on('start', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    const timer = setTimeout(() => {
      if (containerRef.current) {
        const nodeElements = containerRef.current.querySelectorAll('.graph-node');
        nodeElements.forEach((el) => {
          const nodeId = el.getAttribute('data-id');
          const nodeData = memoizedData.nodes.find(n => n.id === nodeId);
          if (nodeData) {
            select(el).data([nodeData]).call(dragHandler as any);
          }
        });
      }
    }, 500);

    return () => {
      simulation.stop();
      clearTimeout(timer);
    };
  }, [memoizedData]);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] bg-white rounded-lg overflow-hidden border">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <svg className="absolute inset-0 w-full h-full">
        {graph.links.map((link, i) => (
          <motion.line
            key={i}
            x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y}
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="absolute inset-0">
        {graph.nodes.map(node => (
          <motion.div
            key={node.id}
            data-id={node.id} // for d3 selection
            className="graph-node absolute flex items-center justify-center rounded-full cursor-pointer border shadow-md"
            style={{
              width: `${node.radius * 2}px`,
              height: `${node.radius * 2}px`,
              borderColor: node.type === 'category' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent to show grid behind
              backdropFilter: 'blur(2px)',
            }}
            animate={{ x: node.x - node.radius, y: node.y - node.radius }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          >
            <span className="text-xs font-semibold p-1 select-none text-center text-black">
              {node.id}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeGraph;