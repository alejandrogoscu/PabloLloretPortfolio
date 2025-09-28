import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer cursor-light">
      <div className="footer-container">
        {/* Añadir link que devuelva al top de la web */}
        <div className="footer-info">
          <h3 className="info-title">Pablo Lloret | </h3>
          <p className="info-text">Video Editor</p>
        </div>

        <div className="footer-socialLinks">
          <a
            className="socialLinks-link"
            href="https://www.linkedin.com/in/pablo-lloret-estrada/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a
            className="socialLinks-link"
            href="https://www.imdb.com/es-es/name/nm16163804/?ref_=ttfc_fcr_26_1"
            target="_blank"
            rel="noopener noreferrer"
          >
            IMDb
          </a>
        </div>

        <div className="footer-copy">
          <p>
            <a href="https://www.alejandrogoscu.es/" target="_blank" rel="noopener noreferrer">
              Code by Code – AlejandroGoscu
            </a>{' '}
            &copy; {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
