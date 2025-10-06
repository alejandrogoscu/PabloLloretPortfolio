import Spinner from '../Spinner/Spinner';
import './loadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-content">
          <h1 className="loading-title">Pablo Lloret</h1>
          <p className="loading-subtitle">Video Editor</p>
          <div className="loading-spinner">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
