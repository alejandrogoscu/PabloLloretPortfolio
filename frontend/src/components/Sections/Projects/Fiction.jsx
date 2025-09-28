import { useEffect, useState } from 'react';
import Gallery from './Gallery';
import ficcionData from '../../../../content/data/ficcion.json';
import './Fiction.css';

const Fiction = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const formattedItems = ficcionData.map((item) => ({
      id: item.id.toString(),
      img: item.img,
      url: item.link || '#',
      width: item.width || 'single',
      title: item.title,
      role: item.role,
      type: item.type,
    }));
    setGalleryItems(formattedItems);
  }, []);

  return (
    <section className="fiction-section" id="fiction">
      <div className="section-title">
        <div className="title-line"></div>
        <h2>Ficción</h2>
        <div className="title-line"></div>
      </div>

      {galleryItems.length > 0 && (
        <Gallery
          items={galleryItems}
          animateFrom="bottom"
          scaleOnHover={true}
          blurToFocus={true}
          colorShiftOnHover={true}
          hoverScale={0.95}
        />
      )}
    </section>
  );
};

export default Fiction;
