import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkIfTouchDevice = () => {
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      setIsTouchDevice(isTouchCapable);
    };

    checkIfTouchDevice();

    if (!isTouchDevice) {
      const cursor = cursorRef.current;

      const updateCursorPosition = (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        cursor.style.display = 'none';
        const elem = document.elementFromPoint(e.clientX, e.clientY);
        cursor.style.display = '';

        if (elem && elem.closest('.cursor-dark')) {
          setIsDark(true);
        } else {
          setIsDark(false);
        }

        if (elem && elem.closest('a, img, button, [role="button"], input, textarea, select')) {
          setIsHover(true);
        } else {
          setIsHover(false);
        }

        if (elem && elem.closest('.cursor-light')) {
          setIsLight(true);
        } else {
          setIsLight(false);
        }
      };

      const handleMouseLeave = () => {
        cursor.style.opacity = '0';
      };
      const handleMouseEnter = () => {
        cursor.style.opacity = '1';
      };

      document.addEventListener('mousemove', updateCursorPosition);
      document.addEventListener('mouseout', handleMouseLeave);
      document.addEventListener('mouseover', handleMouseEnter);

      return () => {
        document.removeEventListener('mousemove', updateCursorPosition);
        document.removeEventListener('mouseout', handleMouseLeave);
        document.removeEventListener('mouseover', handleMouseEnter);
      };
    }
  }, [isTouchDevice]);

  if (isTouchDevice) {
    return null;
  }

  const CursorClass = [
    'custom-cursor',
    isDark ? 'custom-cursor--dark' : '',
    isHover ? 'custom-cursor--hover' : '',
    isLight ? 'custom-cursor--light' : '',
  ].join(' ');

  return <div ref={cursorRef} className={CursorClass} />;
};

export default CustomCursor;
