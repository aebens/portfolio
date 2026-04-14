import FultonSearchBuilder from '../components/projects/FultonSearch/FultonSearchBuilder';
import BlacksDictionary from '../components/projects/BlacksDictionary/BlacksDictionary';
import PokemonDB from '../components/projects/PokemonDB/PokemonDB';

interface ProjectPageProps {
  project: string;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  if (project === 'fultonsearch') {
    return <FultonSearchBuilder />;
  }

  if (project === 'blacksdictionary') {
    return <BlacksDictionary />;
  }

  if (project === 'pokemondb') {
    return <PokemonDB />;
  }

  return (
    <div style={{ padding: '80px 20px 40px' }}>
      <h2>Project not found</h2>
    </div>
  );
}
