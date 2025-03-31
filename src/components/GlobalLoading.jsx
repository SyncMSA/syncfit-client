import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/loadingLottie.json';
import './css/GlobalLoading.css'

const GlobalLoading = () => {
  return (
    <div className="global-loading">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default GlobalLoading;
