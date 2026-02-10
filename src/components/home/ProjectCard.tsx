import type { Project } from '../../data/types';
import MediumIcon from '../common/MediumIcon';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className="project-card visible" onClick={onClick}>
      <div className="project-thumb">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top'
            }}
          />
        ) : (
          <span className="project-thumb-label">Screenshot</span>
        )}
        <div className="project-thumb-icon">
          <MediumIcon type={project.medium} />
        </div>
      </div>
      <div className="project-body">
        <div className="project-tags">
          <span className="project-tag topic">{project.topicLabel}</span>
          <span className="project-tag medium">{project.mediumLabel}</span>
        </div>
        <div className="project-title">{project.title}</div>
        <div className="project-desc">{project.desc}</div>
        <div className="project-footer">
          <span className="project-date">{project.date}</span>
          <span className="project-link">
            View details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
