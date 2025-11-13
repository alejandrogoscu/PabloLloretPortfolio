import { useEffect } from 'react';
import Gallery from './Gallery';
import { useAds } from '../../../context/SpotsContext';
import Spinner from '../../Common/Spinner/Spinner';
import './Spots.css';

const Spots = () => {
  const { ads, loading, error, fetchAds } = useAds();

  useEffect(() => {
    fetchAds();
  }, []);

  const galleryItems = ads
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
    <section className="ads-section" id="ads">
      <div className="section-title">
        <div className="title-line"></div>
        <h2>Spots</h2>
        <div className="title-line"></div>
      </div>

      {loading && <Spinner />}
      {error && <div>Error: {error}</div>}

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

export default Spots;
