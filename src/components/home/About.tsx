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
          I am an instructional design and digital media media professional with a focus on research administration and genealogy.
          I embrace artificial intelligence (AI) to efficiently create media
          and rich learning experiences.
        </p>
        <p>
          I am the Director of Training and Development for Research Administration
          in Sponsored Programs at Boston University, and I am a degree candidate
          for the Master of Liberal Arts in Extension Studies, field: Digital Media
          Design at the Harvard Extension School. Expected graduation is February 2027.
          This degree has been instrumental in exposing me to a wide array of digital
          media projects.
        </p>
        <div className="about-grid">
          <div>
            <div className="about-item-label">Education</div>
            <ul className="about-list">
              <li>Harvard University, ALM in Extension Studies - Digital Media Design, expected February 2027</li>
              <li>Tufts University, MAT - Middle and High School Education (History), 2015</li>
              <li>Middlebury College, BA - German, Religion minor, 2009</li>
            </ul>
          </div>
          <div>
            <div className="about-item-label">Certifications</div>
            <div className="about-item-value">Certified Pre-award Research Administrator (CPRA), Certified Financial Research Administrator (CFRA), Microsoft Excel Expert (score 912)</div>
          </div>
          <div>
            <div className="about-item-label">Human Languages</div>
            <div className="about-item-value">German (B2), French (B2), Chinese (~A2), and some reading ability in Italian, Spanish, and surprise - Sumerian!</div>
          </div>
        </div>
        <Link to="/tech-stack" className="about-tech-link">
          View my tech stack &rarr;
        </Link>
      </div>
    </section>
  );
}
