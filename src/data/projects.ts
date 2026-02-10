import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Fulton History Search Interface",
    desc: "A custom search tool for navigating fultonhistory.com's newspaper archive, optimized for genealogy researchers.",
    topic: "genealogy",
    topicLabel: "Genealogy",
    medium: "webapp",
    mediumLabel: "Web App",
    date: "2025",
    body: `<p>FultonHistory.com is an invaluable resource for genealogy researchers, but its native search interface presents significant usability challenges. This project reimagines the search experience with an intuitive, modern interface.</p>
      <h3>The Problem</h3>
      <p>Researchers spend excessive time wrestling with the search mechanics rather than focusing on their actual research. The original interface lacks filtering, saved searches, and result previewing.</p>
      <h3>The Solution</h3>
      <p>A streamlined search interface with advanced filtering by date range, location, and publication, inline result previews, and the ability to save and organize search sessions for ongoing research projects.</p>`,
    tech: ["HTML/CSS/JS", "Python", "Search API", "Responsive Design"],
    image: "images/fultonsearch.png"
  },
  {
    id: 2,
    title: "NSF Proposal Development Simulation",
    desc: "An interactive training simulation walking users through the NSF proposal submission process from start to finish.",
    topic: "ra",
    topicLabel: "Research Admin",
    medium: "training",
    mediumLabel: "Training",
    date: "2025",
    body: `<p>New faculty and research staff often find the NSF proposal process overwhelming. This interactive simulation provides a safe environment to learn the complete workflow.</p>
      <h3>Approach</h3>
      <p>The simulation presents realistic scenarios and decision points, from initial concept through budget development, compliance checks, and final submission. Users receive immediate feedback on their choices.</p>
      <h3>Impact</h3>
      <p>Deployed as a SCORM package within the university's LMS, the simulation has reduced common submission errors and improved researcher confidence in the proposal process.</p>`,
    tech: ["SCORM", "JavaScript", "LMS Integration", "Instructional Design"]
  },
  {
    id: 3,
    title: "Rhine Valley Documentary Project",
    desc: "A photographic exploration of 19th-century Rhine region landmarks, connecting historical records with present-day landscapes.",
    topic: "genealogy",
    topicLabel: "Genealogy",
    medium: "photo",
    mediumLabel: "Photography",
    date: "2024",
    body: `<p>This ongoing project documents locations across the Rhine Valley that appear in 19th-century immigration and land records, creating a visual bridge between historical documentation and the present landscape.</p>
      <h3>Process</h3>
      <p>Each location is identified through archival research — ship manifests, church records, and land surveys — then photographed to capture both the historical character and contemporary reality of these places.</p>
      <h3>Output</h3>
      <p>The collection is organized as a visual essay, with each photograph accompanied by transcribed historical context from the original German-language documents.</p>`,
    tech: ["Photography", "Archival Research", "German Translation", "Lightroom"]
  },
  {
    id: 4,
    title: "BU Policy Compliance Checker",
    desc: "A web-based tool that guides researchers through Boston University's prior approval and compliance requirements.",
    topic: "ra",
    topicLabel: "Research Admin",
    medium: "webapp",
    mediumLabel: "Web App",
    date: "2025",
    body: `<p>Navigating institutional compliance requirements is one of the most common pain points for researchers. This tool translates complex policy language into a guided, interactive experience.</p>
      <h3>Features</h3>
      <p>The tool uses a decision-tree approach — researchers answer questions about their project, and the tool identifies which prior approvals are needed, which forms to complete, and who to contact. Results can be saved and shared with co-PIs.</p>
      <h3>Design Philosophy</h3>
      <p>The interface deliberately avoids bureaucratic language and instead frames compliance as a series of straightforward yes/no decisions, reducing anxiety around what is often perceived as an opaque process.</p>`,
    tech: ["React", "Python", "Decision Logic", "UX Research"]
  },
  {
    id: 5,
    title: "German Land Records Training App",
    desc: "An educational tool teaching genealogy researchers to read and interpret 19th-century German land transaction records.",
    topic: "genealogy",
    topicLabel: "Genealogy",
    medium: "webapp",
    mediumLabel: "Web App",
    date: "2025",
    body: `<p>Reading 19th-century German handwriting (Kurrent) and understanding land transaction terminology is a significant barrier for genealogy researchers. This app breaks those skills into learnable modules.</p>
      <h3>Curriculum Design</h3>
      <p>Lessons progress from basic Kurrent letterforms through common abbreviations to full document interpretation. Each module includes practice exercises with real historical documents.</p>
      <h3>Vocabulary System</h3>
      <p>An integrated vocabulary game reinforces key legal and land terminology, with spaced repetition to support long-term retention.</p>`,
    tech: ["JavaScript", "Spaced Repetition", "German Typography", "Figma"]
  },
  {
    id: 6,
    title: "SciENcv Biosketch Workshop Series",
    desc: "A video training series walking researchers through the SciENcv system for creating compliant NIH and NSF biosketches.",
    topic: "ra",
    topicLabel: "Research Admin",
    medium: "video",
    mediumLabel: "Video",
    date: "2024",
    body: `<p>The transition to SciENcv-generated biosketches created widespread confusion among faculty. This video series provides clear, step-by-step guidance for the most common scenarios.</p>
      <h3>Series Structure</h3>
      <p>Each video addresses a specific task — creating an account, building an NIH biosketch, adapting for NSF format, managing delegated access — keeping episodes focused and under 10 minutes.</p>
      <h3>Production Approach</h3>
      <p>Screen recordings are augmented with animated callouts and chapter markers, making it easy for researchers to jump to exactly the step they need.</p>`,
    tech: ["Screen Recording", "Video Editing", "Motion Graphics", "LMS"]
  },
  {
    id: 7,
    title: "Research Admin Career Progression Tool",
    desc: "An interactive 'tech tree' visualization mapping career development paths in research administration.",
    topic: "ra",
    topicLabel: "Research Admin",
    medium: "design",
    mediumLabel: "Design",
    date: "2025",
    body: `<p>Research administration careers often lack clear progression frameworks. This tool visualizes skill development and career pathways as an interactive progression tree.</p>
      <h3>Concept</h3>
      <p>Inspired by skill trees in strategy games, the visualization maps competencies from entry-level through senior leadership, showing how different skills unlock new career possibilities.</p>
      <h3>Application</h3>
      <p>Used in onboarding and professional development planning, the tool helps staff identify skill gaps and plan intentional career growth rather than relying on ad hoc advancement.</p>`,
    tech: ["Figma", "D3.js", "UX Design", "Career Framework"]
  },
  {
    id: 8,
    title: "Genealogy Citation Database",
    desc: "A searchable database system for managing and organizing genealogy research citations and source documentation.",
    topic: "genealogy",
    topicLabel: "Genealogy",
    medium: "webapp",
    mediumLabel: "Web App",
    date: "2025",
    body: `<p>Serious genealogy research generates hundreds of citations across diverse source types. This database provides structured citation management designed specifically for genealogical sources.</p>
      <h3>Design Decisions</h3>
      <p>Unlike general-purpose citation managers, this tool understands genealogy-specific source types — census records, church registers, ship manifests, land deeds — and generates properly formatted citations for each.</p>
      <h3>Search & Organization</h3>
      <p>Citations can be linked to individuals, families, locations, and events, creating a rich web of interconnected evidence that supports rigorous research methodology.</p>`,
    tech: ["Python", "SQL", "Database Design", "Full-Text Search"]
  },
  {
    id: 9,
    title: "Sponsored Programs Listening Tour",
    desc: "A survey and data visualization project capturing stakeholder feedback on sponsored research services.",
    topic: "ra",
    topicLabel: "Research Admin",
    medium: "design",
    mediumLabel: "Design",
    date: "2025",
    body: `<p>Understanding how researchers experience sponsored programs services is essential for continuous improvement. This project designed and deployed a comprehensive listening tour survey.</p>
      <h3>Methodology</h3>
      <p>The survey was designed to capture both quantitative satisfaction metrics and qualitative narrative feedback, with careful attention to question design that avoids leading responses.</p>
      <h3>Visualization</h3>
      <p>Results are presented through an interactive dashboard that surfaces key themes, identifies pain points by department and role, and tracks sentiment trends over time.</p>`,
    tech: ["Survey Design", "Data Visualization", "Python", "Dashboard"]
  },
  {
    id: 10,
    title: "Military Voting Laws Educational App",
    desc: "An interactive application explaining military and overseas voting rights and procedures across U.S. states.",
    topic: "tools",
    topicLabel: "Interactive Tools",
    medium: "webapp",
    mediumLabel: "Web App",
    date: "2024",
    body: `<p>Military service members and overseas citizens face unique challenges exercising their voting rights. This application makes the relevant laws and procedures accessible and understandable.</p>
      <h3>Content Architecture</h3>
      <p>Information is organized by state and scenario, allowing users to quickly find the rules that apply to their specific situation rather than parsing lengthy legal text.</p>
      <h3>Accessibility</h3>
      <p>Designed with WCAG compliance and low-bandwidth environments in mind, reflecting the varied connectivity conditions of the target audience.</p>`,
    tech: ["HTML/CSS/JS", "Accessibility", "Legal Research", "Responsive Design"]
  }
];
