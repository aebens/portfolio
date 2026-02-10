import FultonSearchBuilder from '../components/projects/FultonSearch/FultonSearchBuilder';

interface ProjectPageProps {
  project: string;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  if (project === 'fultonsearch') {
    return <FultonSearchBuilder />;
  }

  return (
    <div style={{ padding: '80px 20px 40px' }}>
      <h2>Project not found</h2>
    </div>
  );
}
