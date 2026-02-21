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
    date: "2026",
    body: `<p>FultonHistory.com is an invaluable resource for genealogy researchers, but its native boolean search interface can be challenging to use. This tool provides an intuitive query builder that generates properly formatted search queries.</p>
      <h3>The Problem</h3>
      <p>Researchers need to understand boolean operators, proximity syntax, and filename filtering to effectively search the Fulton archive. The learning curve prevents many users from accessing the full power of the search engine.</p>
      <h3>The Solution</h3>
      <p>A guided query builder with separate fields for each search term, visual proximity configuration, optional date/location filters, and OCR character swap suggestions. The tool generates the complex boolean query automatically, which users can copy and paste into Fulton History's search box.</p>`,
    tech: ["React", "TypeScript", "Anthropic Claude"],
    image: "/images/fultonsearch.png?v=2"
  },
  {
    id: 2,
    title: "Interactive Black's Legal Dictionary",
    desc: "A searchable interface for the 1891 Black's Law Dictionary, making antiquated legal terminology accessible to genealogy researchers.",
    topic: "genealogy",
    topicLabel: "Genealogy",
    medium: "webapp",
    mediumLabel: "Web App",
    date: "2026",
    body: `<p>Historical documents are filled with legal terminology that can be opaque to modern researchers. This tool provides instant access to definitions from the first edition of Black's Law Dictionary (1891).</p>
      <h3>Why the 1891 Edition?</h3>
      <p>The first edition includes antiquated legal terms and concepts that appear frequently in 19th-century records—probate documents, land deeds, court proceedings—but have since fallen out of use. Modern legal dictionaries omit these historical terms, leaving genealogists without a reference.</p>
      <h3>Features</h3>
      <p>The interface allows researchers to quickly search and browse entries, with the original 1891 definitions preserved. The tool bridges the gap between archaic legal language and contemporary understanding, helping researchers accurately interpret historical documents.</p>`,
    tech: ["React", "TypeScript", "Anthropic Claude", "Google Gemini"],
    image: "/images/blacks-dictionary.png"
  }
];
