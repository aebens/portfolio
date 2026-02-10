import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default function Contact() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`reveal ${isVisible ? 'visible' : ''}`}
    >
      <h2>Interested in working together?</h2>
      <div className="contact-actions">
        <a href="mailto:hello@example.com" className="contact-btn primary">Get in touch</a>
        <a href="#" className="contact-btn">LinkedIn</a>
        <a href="#" className="contact-btn">GitHub</a>
      </div>
    </section>
  );
}
