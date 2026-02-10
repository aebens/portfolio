import { useEffect, useRef } from 'react';
import type { Project } from '../../data/types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onCardClick: (index: number) => void;
}

export default function ProjectGrid({ projects, onCardClick }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      card.classList.remove('visible');
      setTimeout(() => {
        card.classList.add('visible');
      }, i * 70);
    });
  }, [projects]);

  return (
    <div className="project-grid" ref={gridRef}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}
