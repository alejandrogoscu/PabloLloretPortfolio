import Spinner from '../Spinner/Spinner';
import './loadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img className="loading-logo" src="../../../../public/images/favicon/PLfavicon.ico" alt="logo"></img>
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
