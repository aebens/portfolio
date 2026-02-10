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
          I am an instructional design and digital media media professional.
          I embrace artificial intelligence (AI) to efficiently create media
          and rich learning experiences.
        </p>
        <p>
          I am the Director of Training and Development for Research Administration
          in Sponsored Programs at Boston University, and I am a degree candidate
          for the Master of Liberal Arts in Extension Studies, field: Digital Media
          Design at the Harvard Extension School. Expected graduation is December 2026.
          This degree has been instrumental in exposing me to a wide array of digital
          media projects.
        </p>
        <div className="about-grid">
          <div>
            <div className="about-item-label">Education</div>
            <div className="about-item-value">Harvard University, MLA, expected 2026</div>
            <div className="about-item-value">Tufts University, MAT, 2015</div>
            <div className="about-item-value">Middlebury College, BA, 2009</div>
          </div>
          <div>
            <div className="about-item-label">Certifications</div>
            <div className="about-item-value">CPRA, CFRA, Microsoft Excel Expert</div>
          </div>
          <div>
            <div className="about-item-label">Languages</div>
            <div className="about-item-value">Python, SQL, VBA</div>
          </div>
          <div>
            <div className="about-item-label">Design Tools</div>
            <div className="about-item-value">Adobe Suite, Articulate, Camtasia, Figma, Notion</div>
          </div>
        </div>
      </div>
    </section>
  );
}
