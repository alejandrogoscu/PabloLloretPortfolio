import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: '',
  });

  const MAX_LENGTH = 200;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: false, message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al enviar el mensaje');
      }

      setStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: '¡Mensaje enviado correctamente!',
      });

      setFormData({ subject: '', name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: true,
        error: true,
        message: error.message || 'Ocurrió un error al enviar el mensaje',
      });
    }
  };

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-content">
        <h2 className="contact-title">¡ Contemos historias juntos !</h2>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-phone">
              <span>Teléfono:</span>
              <a className="contact-link" href="tel:+34634425109">
                <span>634 42 51 09</span>
              </a>
            </div>

            <div className="contact-linedin">
              <span>LinkedIn:</span>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/pablo-lloret-estrada/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Pablo Lloret</span>
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                maxLength={MAX_LENGTH}
                onChange={handleChange}
                required
              />
              <div className="char-counter">
                {formData.message.length}/{MAX_LENGTH}
              </div>
            </div>

            {status.message && <div className={`form-status ${status.error ? 'error' : ''}`}>{status.message}</div>}
            <button className="contact-submit" type="submit" disabled={status.submitting}>
              {status.submitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
