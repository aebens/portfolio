import { Link } from 'react-router-dom';

interface Tool {
  name: string;
  description: string;
}

const programmingLanguages: Tool[] = [
  {
    name: "Python",
    description: "Data processing, automation scripts, and backend logic for research tools and web applications.",
  },
  {
    name: "SQL",
    description: "Database querying and management for structured data, including citation databases and research records.",
  },
  {
    name: "VBA",
    description: "Excel automation and custom macros for streamlining research administration workflows.",
  },
  {
    name: "HTML",
    description: "Semantic markup for web content, accessible document structure, and email templates.",
  },
  {
    name: "CSS",
    description: "Responsive styling, layout systems, and visual design for web applications and digital media projects.",
  },
  {
    name: "JavaScript",
    description: "Interactive front-end features, DOM manipulation, and client-side logic for web tools.",
  },
];

const designTools: Tool[] = [
  {
    name: "Adobe Suite",
    description: "Audition, Illustrator, Lightroom, Photoshop, and Premiere Pro for full-stack media production.",
  },
  {
    name: "Articulate",
    description: "E-learning course development with interactive modules, quizzes, and SCORM-compliant training content.",
  },
  {
    name: "Camtasia",
    description: "Screen recording and video editing for instructional tutorials and training series.",
  },
  {
    name: "Figma",
    description: "UI/UX design, prototyping, and collaborative design for web applications and interactive tools.",
  },
  {
    name: "Notion",
    description: "Project management, documentation, and knowledge base organization for research and development workflows.",
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="tech-card">
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
    </div>
  );
}

export default function TechStackPage() {
  return (
    <div className="tech-stack-page">
      <Link to="/" className="tech-back-link">&larr; Back to home</Link>
      <h1>Tech Stack</h1>
      <p className="tech-intro">
        The languages, frameworks, and tools I use to build digital media projects and research tools.
      </p>

      <section className="tech-category">
        <h2>Programming Languages</h2>
        <div className="tech-grid">
          {programmingLanguages.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>

      <section className="tech-category">
        <h2>Design Tools</h2>
        <div className="tech-grid">
          {designTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
