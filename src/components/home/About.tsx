import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default function About() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="about-photo"><span>Your photo</span></div>
      <div className="about-content">
        <h2>About</h2>
        <p>
          I am an instructional design and digital media professional with a focus on research administration and genealogy.
          I embrace artificial intelligence (AI) to efficiently create media
          and rich learning experiences.
        </p>
        <p>
          I am the Director of Training and Development for Research Administration
          in Sponsored Programs at Boston University, and I am a degree candidate
          for the Master of Liberal Arts in Extension Studies, field: Digital Media
          Design at the Harvard Extension School. 
          
          I self-identify as a lifelong learner, and I spend a lot of time seeking opportunities to learn anything I can.
        </p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <Link to="/cv" className="about-tech-link">
            View my CV &rarr;
          </Link>
          <Link to="/tech-stack" className="about-tech-link">
            View my tech stack &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
