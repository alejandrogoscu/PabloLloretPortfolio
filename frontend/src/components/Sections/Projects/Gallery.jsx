import { useEffect, useState, useRef } from 'react';
import './Gallery.css';

const Gallery = ({ items }) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    setImagesLoaded(0);

    items.forEach((item) => {
      const img = new Image();
      img.src = item.img;
      img.onload = () => setImagesLoaded((prev) => prev + 1);
      img.onerror = () => {
        console.error(`Error loading image: ${item.img}`);
        setImagesLoaded((prev) => prev + 1);
      };
    });
  }, [items]);

  const isReady = imagesLoaded === items.length;

  const scrollToTopOfSection = () => {
    const fictionSection = document.getElementById('fiction');
    const adsSection = document.getElementById('ads');

    if (fictionSection && fictionSection.contains(galleryRef.current)) {
      fictionSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (adsSection && adsSection.contains(galleryRef.current)) {
      adsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const organizeItems = (items, columnsCount = 3) => {
    const sortedItems = [...items].sort((a, b) => parseInt(b.id) - parseInt(a.id));

    if (columnsCount === 1) {
      return sortedItems;
    }

    const result = [];
    const orphanedSingles = [];
    const grid = new Array(columnsCount).fill(0);

    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];
      const span = getItemSpan(item.width, columnsCount);

      let position = findPosition(grid, span);

      if (position !== -1) {
        occupyGrid(grid, position, span);

        if (item.width === 'single') {
          const remainingSpace = getRemainingSpace(grid);
          const pendingSingles = sortedItems.slice(i + 1).filter((s) => s.width === 'single');

          if (remainingSpace < 1 && pendingSingles.length > 0) {
            orphanedSingles.push(item);
            freeGrid(grid, position, span);
          } else {
            result.push(item);
          }
        } else {
          result.push(item);
        }
      } else {
        grid.fill(0);
        occupyGrid(grid, 0, span);

        if (item.width === 'single') {
          const pendingSingles = sortedItems.slice(i + 1).filter((s) => s.width === 'single');

          if (pendingSingles.length > 0) {
            orphanedSingles.push(item);
            grid.fill(0);
          } else {
            result.push(item);
          }
        } else {
          result.push(item);
        }
      }
    }

    const sortedOrphanedSingles = orphanedSingles.sort((a, b) => parseInt(b.id) - parseInt(a.id));

    return [...result, ...sortedOrphanedSingles];
  };

  const getItemSpan = (width, columnsCount) => {
    if (columnsCount === 2) {
      return width === 'single' ? 1 : 2;
    }
    switch (width) {
      case 'full':
        return 3;
      case 'double':
        return 2;
      case 'single':
      default:
        return 1;
    }
  };

  const findPosition = (grid, span) => {
    for (let i = 0; i <= grid.length - span; i++) {
      let canFit = true;
      for (let j = i; j < i + span; j++) {
        if (grid[j] !== 0) {
          canFit = false;
          break;
        }
      }
      if (canFit) return i;
    }
    return -1;
  };

  const occupyGrid = (grid, position, span) => {
    for (let i = position; i < position + span; i++) {
      grid[i] = 1;
    }
  };

  const freeGrid = (grid, position, span) => {
    for (let i = position; i < position + span; i++) {
      grid[i] = 0;
    }
  };

  const getRemainingSpace = (grid) => {
    return grid.filter((cell) => cell === 0).length;
  };

  const getColumnSpan = (width) => {
    switch (width) {
      case 'full':
        return 'full';
      case 'double':
        return 2;
      case 'single':
      default:
        return 1;
    }
  };

  const getColumnsCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }
    return 3;
  };

  const organizedItems = organizeItems(items, getColumnsCount());

  return (
    <div className={`horizontal-gallery ${isReady ? 'loaded' : 'loading'}`} ref={galleryRef}>
      <div className="gallery-track">
        {organizedItems.map((item) => {
          const columnSpan = getColumnSpan(item.width);

          return (
            <div
              className="gallery-item"
              key={item.id}
              style={{
                gridColumn: columnSpan === 'full' ? '1/-1' : `span ${columnSpan}`,
              }}
              onClick={() => item.url && item.url !== '#' && window.open(item.url, '_blank', 'noopener')}
            >
              <img className="gallery-img" src={item.img} alt={item.title} />
              <div className="item-overlay">
                <h3>
                  <strong>{item.title}</strong> | {item.role}
                </h3>
                <p>{item.type}</p>
              </div>
            </div>
          );
        })}

        <div className="gallery-scroll-top" onClick={scrollToTopOfSection}>
          <div className="scroll-arrow">↑</div>
          <span>Arriba</span>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
