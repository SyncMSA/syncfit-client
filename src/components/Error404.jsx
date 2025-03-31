import Lottie from "lottie-react";
import notfoundLottie from '../assets/animations/error404Lottie.json'
import { FaArrowLeft } from "react-icons/fa";
import CustomLink from "./CustomLink";
import './css/error404.css'

const Error404 = () => {
  return (
    <div className='error404'>
      <div className="error404-lottie">
        <Lottie animationData={notfoundLottie} />
      </div>
      <div className='error404-content'>
        <h1>Oops</h1>
        <h1>404</h1>
        <CustomLink to={".."} className={"error404-link"} text={"홈으로 이동"} icon={<FaArrowLeft />}/>
      </div>
    </div>
  )
}

export default Error404