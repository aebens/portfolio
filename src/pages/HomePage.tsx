import { useState, useMemo } from 'react';
import Hero from '../components/home/Hero';
import ProjectFilters from '../components/home/ProjectFilters';
import ProjectGrid from '../components/home/ProjectGrid';
import DetailPanel from '../components/home/DetailPanel';
import About from '../components/home/About';
import Contact from '../components/home/Contact';
import { projects } from '../data/projects';
import type { TopicFilter, MediumFilter } from '../data/types';

const allTech = ['all', ...Array.from(new Set(projects.flatMap((p) => p.tech)))];

export default function HomePage() {
  const [activeTopicFilter, setActiveTopicFilter] = useState<TopicFilter>('all');
  const [activeMediumFilter, setActiveMediumFilter] = useState<MediumFilter>('all');
  const [activeTechFilter, setActiveTechFilter] = useState<string>('all');
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [currentDetailIndex, setCurrentDetailIndex] = useState(-1);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const topicMatch = activeTopicFilter === 'all' || p.topic === activeTopicFilter;
      const mediumMatch = activeMediumFilter === 'all' || p.medium === activeMediumFilter;
      const techMatch = activeTechFilter === 'all' || p.tech.includes(activeTechFilter);
      return topicMatch && mediumMatch && techMatch;
    });
  }, [activeTopicFilter, activeMediumFilter, activeTechFilter]);

  const openDetail = (index: number) => {
    setCurrentDetailIndex(index);
    setDetailPanelOpen(true);
  };

  const closeDetail = () => {
    setDetailPanelOpen(false);
  };

  const navigateDetail = (direction: number) => {
    const next = currentDetailIndex + direction;
    if (next >= 0 && next < filteredProjects.length) {
      setCurrentDetailIndex(next);
    }
  };

  return (
    <>
      <Hero />
      <section id="projects">
        <ProjectFilters
          activeTopicFilter={activeTopicFilter}
          activeMediumFilter={activeMediumFilter}
          activeTechFilter={activeTechFilter}
          setActiveTopicFilter={setActiveTopicFilter}
          setActiveMediumFilter={setActiveMediumFilter}
          setActiveTechFilter={setActiveTechFilter}
          availableTech={allTech}
          resultsCount={filteredProjects.length}
        />
        <ProjectGrid projects={filteredProjects} onCardClick={openDetail} />
      </section>
      <About />
      <Contact />
      <DetailPanel
        isOpen={detailPanelOpen}
        currentIndex={currentDetailIndex}
        projects={filteredProjects}
        onClose={closeDetail}
        onNavigate={navigateDetail}
      />
    </>
  );
}
