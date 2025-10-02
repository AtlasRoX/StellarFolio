'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ViewMode, Skill } from '../resume-view';
import SkillGalaxy from '../interactive/skill-galaxy';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { List, Star } from 'lucide-react';

interface SkillsSectionProps {
  viewMode: ViewMode;
  skills: Skill[];
}

export function SkillsSection({ viewMode, skills }: SkillsSectionProps) {
  const [isGalaxyMode, setIsGalaxyMode] = useState(false);

  if (!skills.length) return null;

  const skillsByCategory = skills.reduce((acc, skill) => {
    const { category } = skill;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Skills</h2>
        <Button variant="outline" size="sm" onClick={() => setIsGalaxyMode(!isGalaxyMode)} className="gap-2">
          {isGalaxyMode ? <List className="h-4 w-4" /> : <Star className="h-4 w-4" />}
          {isGalaxyMode ? 'List View' : 'Galaxy View'}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isGalaxyMode ? 'galaxy' : 'list'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {isGalaxyMode ? (
            <SkillGalaxy skills={skills} />
          ) : (
            <div className="space-y-4">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold mb-3 text-primary">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="text-sm py-1 px-3">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
