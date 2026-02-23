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
          media projects.  While the ALM is only 12 courses, including the capstone, I have made use of my tuition remission benefit at Harvard to take many more courses than were required.
        </p>
        <div className="about-grid">
          <div>
            <div className="about-item-label">Education</div>
            <ul className="about-list">
              <li>Harvard University, ALM in Extension Studies - Digital Media Design, expected February 2027
                <ul>
                  <li>Graduate Certificate - Learning and Design Technology, 2025</li>
                </ul>
              </li>
              <li>Harvard University (Extension School) - Graduate Certificate - Back-end Web Design, expected 2026
                <ul>
                  <li>Harvard University (Extension School) - Microcertificate - Database Management, expected 2026</li>
                </ul>
              </li>
              <li>Harvard University (Extension School) - Graduate Certificate - Project Management, 2024
                <ul>
                  <li>Harvard University (Extension School) - Microcertificate - Project Management Methodologies, 2023</li>
                </ul>
              </li>
              <li>Harvard University (Extension School) - Graduate Certificate - Front-end Web Design, 2020</li>
              <li>Tufts University, MAT - Middle and High School Education (History), 2015</li>
              <li>Middlebury College, BA - German, Religion minor, 2009</li>
            </ul>
          </div>
          <div>
            <div className="about-item-label">Certifications and Licensure</div>
            <div className="about-item-value">Certified Pre-award Research Administrator (CPRA), Certified Financial Research Administrator (CFRA), Microsoft Excel Expert (score 912), Prelimary License for Teaching History, 6-12</div>
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
