import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const refs = useRef([]);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    refs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="page-main">
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="section-label">Reach Out</div>
        <h1 className="page-hero-title">Contact <em>Us</em></h1>
        <p className="page-hero-sub">We'd love to hear from you.</p>
      </div>

      <section className="contact-section">
        <div className="contact-info reveal" ref={el => refs.current[0] = el}>
          <div className="section-label">Get In Touch</div>
          <h2 className="section-heading">Let's <em>Connect</em></h2>
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-item-label">Email</div>
              <div className="contact-item-value">email@abhivriddhi.com</div>
            </div>
            <div className="contact-item">
              <div className="contact-item-label">General Enquiries</div>
              <div className="contact-item-value">Name · +91 00000 00000</div>
            </div>
            <div className="contact-item">
              <div className="contact-item-label">Sponsorship</div>
              <div className="contact-item-value">Name · +91 00000 00000</div>
            </div>
            <div className="contact-item">
              <div className="contact-item-label">Follow Us</div>
              <div className="contact-socials">
                <a href="#" className="social-btn" title="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"/></svg>
                </a>
                <a href="#" className="social-btn" title="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 10 1.78 1.78 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
                </a>
                <a href="#" className="social-btn" title="YouTube">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap reveal" ref={el => refs.current[1] = el}>
          {sent ? (
            <div className="form-success">
              <div className="section-label">Message Sent</div>
              <h3 className="section-heading">Thank <em>You</em></h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '0.92rem' }}>We'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" type="text" placeholder="What's this about?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input form-textarea" placeholder="Your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit" className="btn-primary" style={{ opacity: 1, transform: 'none' }}>
                Send Message <span className="btn-arrow">→</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
