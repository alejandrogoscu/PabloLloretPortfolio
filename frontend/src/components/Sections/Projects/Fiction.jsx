import { useEffect } from 'react';
import Gallery from './Gallery';
import { useFiction } from '../../../context/FictionContext';
import Spinner from '../../Common/Spinner/Spinner';
import './Fiction.css';

const Fiction = () => {
  const { fictions, loading, error, fetchFictions } = useFiction();

  useEffect(() => {
    fetchFictions();
  }, []);

  const galleryItems = fictions
    .slice()
    .reverse()
    .map((item) => ({
      id: item._id,
      img: item.img,
      url: item.link || '#',
      width: item.width || 'single',
      title: item.title,
      role: item.role,
      type: item.type,
      widthPx: item.widthPX,
      heightPx: item.heightPX,
    }));

  return (
    <section className="fiction-section" id="fiction">
      <div className="section-title">
        <div className="title-line"></div>
        <h2>Ficción</h2>
        <div className="title-line"></div>
      </div>

      {loading && <Spinner />}
      {error && <div>Error: {error}</div>}

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
