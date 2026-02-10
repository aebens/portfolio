import type { TopicFilter, MediumFilter } from '../../data/types';

interface ProjectFiltersProps {
  activeTopicFilter: TopicFilter;
  activeMediumFilter: MediumFilter;
  setActiveTopicFilter: (filter: TopicFilter) => void;
  setActiveMediumFilter: (filter: MediumFilter) => void;
  resultsCount: number;
}

export default function ProjectFilters({
  activeTopicFilter,
  activeMediumFilter,
  setActiveTopicFilter,
  setActiveMediumFilter,
  resultsCount,
}: ProjectFiltersProps) {
  const topicFilters: { value: TopicFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'genealogy', label: 'Genealogy' },
    { value: 'ra', label: 'Research Admin' },
    { value: 'visual', label: 'Visual Media' },
    { value: 'tools', label: 'Interactive Tools' },
  ];

  const mediumFilters: { value: MediumFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'webapp', label: 'Web App' },
    { value: 'photo', label: 'Photography' },
    { value: 'video', label: 'Video' },
    { value: 'design', label: 'Design' },
    { value: 'training', label: 'Training' },
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
      <div className="filter-divider"></div>
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
      <div className="filter-results-count">
        Showing {resultsCount} project{resultsCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
