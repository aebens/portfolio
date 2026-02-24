import type { TopicFilter, MediumFilter } from '../../data/types';

interface ProjectFiltersProps {
  activeTopicFilter: TopicFilter;
  activeMediumFilter: MediumFilter;
  activeTechFilter: string;
  setActiveTopicFilter: (filter: TopicFilter) => void;
  setActiveMediumFilter: (filter: MediumFilter) => void;
  setActiveTechFilter: (filter: string) => void;
  availableTech: string[];
  resultsCount: number;
}

export default function ProjectFilters({
  activeTopicFilter,
  activeMediumFilter,
  activeTechFilter,
  setActiveTopicFilter,
  setActiveMediumFilter,
  setActiveTechFilter,
  availableTech,
  resultsCount,
}: ProjectFiltersProps) {
  const topicFilters: { value: TopicFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'genealogy', label: 'Genealogy' },
  ];

  const mediumFilters: { value: MediumFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'webapp', label: 'Web App' },
  ];

  return (
    <div className="filter-section">
      <div className="filter-group">
        <span className="filter-label">Topic</span>
        <div className="filter-chips">
          {topicFilters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-chip ${activeTopicFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveTopicFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <span className="filter-label">Medium</span>
        <div className="filter-chips">
          {mediumFilters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-chip ${activeMediumFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveMediumFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <span className="filter-label">Tools</span>
        <div className="filter-chips">
          {availableTech.map((tech) => (
            <button
              key={tech}
              className={`filter-chip ${activeTechFilter === tech ? 'active' : ''}`}
              onClick={() => setActiveTechFilter(tech)}
            >
              {tech === 'all' ? 'All' : tech}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-results-count">
        Showing {resultsCount} project{resultsCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
