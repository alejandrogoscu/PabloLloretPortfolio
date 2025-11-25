import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './Navbar.css';

const Navbar = ({ className = '', ease = 'power3.out' }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef(Array(3).fill(null));
  const tlRef = useRef(null);

  const navItems = [
    {
      label: 'Proyectos',
      bgColor: 'var(--white)',
      textColor: 'var(--blue)',
      links: [
        { label: 'Ficción', href: '#fiction', ariaLabel: 'Ver proyectos de ficción' },
        { label: 'Publicidad', href: '#spots', ariaLabel: 'Ver proyectos de Publicidad' },
      ],
    },
    {
      label: 'Sobre mí',
      bgColor: 'var(--white)',
      textColor: 'var(--blue)',
      links: [
        { label: 'Biografía', href: '#biografia', ariaLabel: 'Ver mi biografía' },
        { label: 'Habilidades', href: '#habilidades', ariaLabel: 'Ver mis habilidades' },
      ],
    },
    {
      label: 'Perfiles',
      bgColor: 'var(--white)',
      textColor: 'var(--blue)',
      links: [
        {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/pablo-lloret-estrada/',
          ariaLabel: 'Visita mi perfil de LinkedIn',
        },
        {
          label: 'IMDb',
          href: 'https://www.imdb.com/es-es/name/nm16163804/?ref_=ttfc_fcr_26_1',
          ariaLabel: 'Visita mi perfil de IMDb',
        },
      ],
    },
  ];

  const handleInternalLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();

      if (isExpanded) {
        setIsHamburgerOpen(false);
        if (tlRef.current) {
          tlRef.current.eventCallback('onReverseComplete', () => setIsExpanded(false));
          tlRef.current.reverse();
        }
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      }
    }
  };

  const handleContactClick = (e) => {
    handleInternalLinkClick(e, '#contacto');
  };

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const validCards = cardsRef.current.filter(Boolean);
    if (validCards.length === 0) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  useLayoutEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsHamburgerOpen(false);
        if (tlRef.current) {
          tlRef.current.eventCallback('onReverseComplete', () => setIsExpanded(false));
          tlRef.current.reverse();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu cursor-light ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <h1 className="logo-text">Pablo Lloret</h1>
          </div>

          <button className="card-nav-cta-button" type="button" onClick={handleContactClick}>
            Contacta
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {navItems.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card cursor-dark"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={(e) => (lnk.href.startsWith('#') ? handleInternalLinkClick(e, lnk.href) : null)}
                    {...(item.label === 'Perfiles'
                      ? {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        }
                      : {})}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
