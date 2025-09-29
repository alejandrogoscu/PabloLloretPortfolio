import LogoLoop from './LogoLoop';
import './Skills.css';

const Skills = () => {
  const skillLogos = [
    {
      src: '/images/skillLogos/avidLogo.webp',
      alt: 'Avid Media Composer',
      title: 'Avid Media Composer',
      width: 100,
      heigth: 50,
    },
    {
      src: '/images/skillLogos/premiereLogo.webp',
      alt: 'Adobe Premiere',
      title: 'Adobe Premiere',
      width: 100,
      heigth: 50,
    },
    {
      src: '/images/skillLogos/afterLogo.webp',
      alt: 'Adobe AfterEffects',
      title: 'Adobe AfterEffects',
      width: 100,
      heigth: 50,
    },
    {
      src: '/images/skillLogos/photoshopLogo.webp',
      alt: 'Adobe Photoshop',
      title: 'Adobe Photoshop',
      width: 100,
      heigth: 50,
    },
    {
      src: '/images/skillLogos/davinciLogo.webp',
      alt: 'DaVinci. Resolve',
      title: 'DaVinci Resolve',
      width: 100,
      heigth: 50,
    },
    {
      src: '/images/skillLogos/frameioLogo.webp',
      alt: 'Frame.io',
      title: 'Frame.io',
      width: 100,
      heigth: 50,
    },
    {
      src: '/images/skillLogos/filezillaLogo.webp',
      alt: 'Filezilla',
      title: 'Filezilla',
      width: 100,
      heigth: 50,
    },
    {
      src: '/images/skillLogos/notionLogo.webp',
      alt: 'Notion',
      title: 'Notion',
      width: 100,
      heigth: 50,
    },
    {
      src: '/images/skillLogos/canvaLogo.webp',
      alt: 'Canva',
      title: 'Canva',
      width: 100,
      heigth: 50,
    },
  ];

  return (
    <section className="skills-section" id="habilidades">
      <div className="section-title">
        <div className="title-line"></div>
        <h2>Habilidades</h2>
        <div className="title-line"></div>
      </div>

      <div className="skills-text">
        <p>
          Mis principales habilidades se centran en el <span>trabajo en equipos multidisciplinares</span>, la{' '}
          <span>coordinación de procesos de postproducción</span> y la <span>formación de personal</span> en el área.{' '}
          <span>Gestiono el feedback de manera constructiva</span> y estoy acostumbrado a{' '}
          <span>trabajar bajo presión</span> y con plazos ajustados. Además, me desenvuelvo con fluidez en{' '}
          <span>español, inglés y valenciano</span>. Y para completar todo esto, estas son las herramientas con las que
          me entiendo mejor.
        </p>
      </div>

      <div className="logo-carousel">
        <LogoLoop
          logos={skillLogos}
          speed={60}
          direction="left"
          logoHeight={50}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="var(--black)"
          ariaLabel="Software skills"
        />
      </div>
    </section>
  );
};

export default Skills;
