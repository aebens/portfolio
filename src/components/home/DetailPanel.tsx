import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../data/types';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface DetailPanelProps {
  isOpen: boolean;
  currentIndex: number;
  projects: Project[];
  onClose: () => void;
  onNavigate: (direction: number) => void;
}

export default function DetailPanel({
  isOpen,
  currentIndex,
  projects,
  onClose,
  onNavigate,
}: DetailPanelProps) {
  useKeyboardNavigation(
    isOpen,
    onClose,
    () => onNavigate(-1),
    () => onNavigate(1)
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (currentIndex < 0 || currentIndex >= projects.length) {
    return null;
  }

  const project = projects[currentIndex];

  return (
    <>
      <div
        className={`detail-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <div className={`detail-panel ${isOpen ? 'active' : ''}`}>
        <div className="detail-close">
          <button className="detail-close-btn" onClick={onClose}>
            &times;
          </button>
          <div className="detail-nav-btns">
            <button
              className="detail-nav-btn"
              onClick={() => onNavigate(-1)}
              disabled={currentIndex === 0}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M11 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              className="detail-nav-btn"
              onClick={() => onNavigate(1)}
              disabled={currentIndex === projects.length - 1}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="detail-hero">
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
            <span>Project screenshot / media</span>
          )}
        </div>
        <div className="detail-content">
          <div className="detail-tags">
            <span className="project-tag topic">{project.topicLabel}</span>
            <span className="project-tag medium">{project.mediumLabel}</span>
          </div>
          <h2>{project.title}</h2>
          <div className="detail-meta">{project.date}</div>
          <div
            className="detail-body"
            dangerouslySetInnerHTML={{ __html: project.body }}
          />

          {/* Show link to interactive tool for Fulton Search project */}
          {project.id === 1 && (
            <Link
              to="/projects/fultonsearch"
              className="contact-btn primary"
              style={{
                display: 'inline-block',
                marginTop: '24px',
                textDecoration: 'none'
              }}
            >
              Launch Interactive Tool →
            </Link>
          )}

          <div className="detail-tech">
            {project.tech.map((tech, i) => (
              <span key={i} className="detail-tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
