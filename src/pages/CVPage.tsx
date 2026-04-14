import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function CVPage() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${isVisible ? 'visible' : ''}`}
      style={{ padding: '80px 48px 80px', maxWidth: '860px', margin: '0 auto' }}
    >
      <h1>Curriculum Vitae</h1>

      {/* EDUCATION OVERVIEW SECTION */}
      <section>
        <h2 style={{ marginTop: '48px' }}>Education</h2>
        
        <div className="about-education">
          <div className="about-item-label">Degrees</div>
          <ul className="about-list">
            <li>Harvard University, ALM in Extension Studies - Digital Media Design, expected February 2027</li>
            <li>Tufts University, MAT - Middle and High School Education (History), 2015</li>
            <li>Middlebury College, BA - German, Religion minor, 2009</li>
          </ul>
        </div>

        <div className="about-education">
          <div className="about-item-label">Certificates</div>
          <ul className="about-list">
            <li>Harvard Extension School
              <ul>
                <li>Graduate Certificate - Back-end Web Design, expected 2026
                  <ul>
                    <li>Microcertificate - Database Management, expected 2026</li>
                  </ul>
                </li>
                <li>Graduate Certificate - Learning and Design Technology, 2025</li>
                <li>Graduate Certificate - Project Management, 2024
                  <ul>
                    <li>Microcertificate - Project Management Methodologies, 2023</li>
                  </ul>
                </li>
                <li>Graduate Certificate - Front-end Web Design, 2020</li>
              </ul>
            </li>
            <li>Digital Learning Institute
              <ul>
                <li>Associate Certificate in AI for Learning, Jan 2025 – Apr 2025</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="about-education">
          <div className="about-item-label">Genealogical Institutes</div>
          <ul className="about-list">
            <li>GRIP (Genealogical Research Institute of Philadelphia)
              <ul>
                <li>Reading, Transcribing and Abstracting Old Documents, 2021 - Carla S. Cegielsk</li>
                <li>Pennsylvania Research, 2021 - Amy E. K. Arner</li>
                <li>Intro to Jewish Genealogy, 2020 - Janette Silverman</li>
                <li>New Jersey Research, 2020 - Melissa Johnson</li>
                <li>American Quaker Records, 2020 - Annette Burke Lyttle</li>
              </ul>
            </li>
            <li>IGHR (Institute of Genealogy and Historical Research)
              <ul>
                <li>Repository Research: From Website to Doorway, 2026 - Cyndi Ingle</li>
                <li>For Land's Sake! Advanced Analysis and Platting, 2025 - Jerry Smith</li>
                <li>Writing and Publishing for Genealogists, 2024 - Tom Jones</li>
              </ul>
            </li>
            <li>SLIG (Salt Lake Institute of Genealogy)
              <ul>
                <li>Bridging the Gap: New England to the Midwest, 1780-1850, 2026 - D. Joshua Taylor</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      {/* EMPLOYMENT SECTION */}
      <section>
        <h2 style={{ marginTop: '48px' }}>Academic and Related Employment</h2>
        <ul className="about-list">
          <li>Director of Training & Development for Research Administration, Boston University, Aug 2025 - Present</li>
          <li>Assistant Director of Research Administration Systems and Training, Harvard University, Jul 2022 - Aug 2025</li>
          <li>Sponsored Research Project Manager, Harvard University, Jul 2021 - Jul 2022</li>
          <li>Research Portfolio Manager, Harvard University, Jan 2017 - Jul 2021</li>
          <li>Research Administration Manager, Harvard University, Oct 2015 - Dec 2016</li>
          <li>Grants Coordinator, Department of Chemistry, Tufts University, Jan 2012 - Oct 2015</li>
          <li>Staff Assistant, Department of Chemistry, Tufts University, Mar 2010 - Dec 2011</li>
        </ul>
      </section>

      {/* SERVICE SECTION */}
      <section>
        <h2 style={{ marginTop: '48px' }}>Service & Community Engagement</h2>
        <ul className="about-list">
          <li>Founding Member, Coalition for Responsible AI in Genealogy, 2024 - Present</li>
        </ul>
      </section>

      {/* CERTIFICATIONS & LANGUAGES */}
      <section>
        <h2 style={{ marginTop: '48px' }}>Professional Credentials</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          <div>
            <div className="about-item-label">Certifications and Licensure</div>
            <ul className="about-list">
              <li>Certified Digital Learning Associate (CDLA) - Digital Learning Institute, May 2025</li>
              <li>Microsoft Excel Expert (score 912)</li>
              <li>Certified Financial Research Administrator (CFRA), 2018-present</li>
              <li>Certified Pre-award Research Administrator (CPRA), 2016-present</li>
              <li>Preliminary License for Teaching History, 6-12</li>
            </ul>
          </div>
          <div>
            <div className="about-item-label">Languages</div>
            <div className="about-item-value">German (B2), French (B2), Chinese (~A2), and some reading ability in Italian, Spanish, and surprise - Sumerian!</div>
          </div>
        </div>
      </section>

      {/* RESEARCH & PUBLICATIONS SECTION */}
      <section>
        <h2 style={{ marginTop: '48px' }}>Presentations</h2>
        
        <div className="about-education">
          <div className="about-item-label">Research Administration</div>
          <ul className="about-list">
            <li>Utilizing AI to Enhance and Improve Departmental Support Across the Sponsored Project Lifecycle, NCURA 2nd AI Symposium, June 24, 2024, Alexandria, Virginia</li>
            <li>The Invisible Hero: AI's Role in Efficiency in Research Administration, NCURA Region 1 Spring Meeting, May 8, 2024, Portland, Maine</li>
            <li>AI and Sponsored Research Administration, PRA 2024 Conference, March 22, 2024, Honolulu, Hawaii</li>
            <li>Surfing the AI Wave: Working Smarter Not Harder, PRA 2024 Conference Workshop, March 20, 2024, Honolulu, Hawaii</li>
            <li>Opening Remarks & The Role of AI in Research Administration, FDP Virtual Fall Meeting, September 19, 2023</li>
          </ul>
        </div>

        <div className="about-education">
          <div className="about-item-label">Genealogy</div>
          <ul className="about-list">
            <li>Building Applications to Teach You Genealogy, Victoria Genealogical Society, February 21, 2026</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
