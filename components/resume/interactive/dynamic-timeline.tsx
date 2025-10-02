"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TimelineEvent {
  year: string
  title: string
  company: string
  description: string
  achievements: string[]
  technologies: string[]
  type: "work" | "education" | "project"
}

interface DynamicTimelineProps {
  events: TimelineEvent[]
}

export function DynamicTimeline({ events }: DynamicTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className="relative py-12">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
      <motion.div
        className="absolute left-8 top-0 w-0.5 bg-primary origin-top"
        style={{
          scaleY: scrollYProgress,
        }}
      />

      <div className="space-y-12">
        {events.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const typeColors = {
    work: "bg-blue-500",
    education: "bg-green-500",
    project: "bg-purple-500",
  }

  return (
    <motion.div ref={ref} style={{ opacity, scale }} className="relative pl-20">
      {/* Timeline dot */}
      <motion.div
        className={`absolute left-6 top-6 w-5 h-5 rounded-full border-4 border-background ${typeColors[event.type]}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      />

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{event.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{event.company}</p>
            </div>
            <Badge variant="outline">{event.year}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="leading-relaxed">{event.description}</p>

          {event.achievements.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-sm">Key Achievements</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {event.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {event.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
