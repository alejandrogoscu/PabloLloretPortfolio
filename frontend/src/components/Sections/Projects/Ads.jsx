import { useEffect, useState } from 'react';
import Gallery from './Gallery';
import adsData from '../../../../content/data/ads.json';
import './Ads.css';

const Ads = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const formattedItems = adsData.map((item) => ({
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
    <section className="ads-section" id="ads">
      <div className="section-title">
        <div className="title-line"></div>
        <h2>Publicidad</h2>
        <div className="title-line"></div>
      </div>

      {galleryItems.length > 0 && (
        <Gallery
          items={galleryItems}
          animatedForm="bottom"
          scaleOnHover={true}
          blurToFocus={true}
          colorShiftOnHover={true}
          hoverScale={0.95}
        />
      )}
    </section>
  );
};

export default Ads;
