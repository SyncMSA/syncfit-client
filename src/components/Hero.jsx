import './css/Hero.css'
import hero from '../assets/videos/hero.mp4'
import CustomLink from './CustomLink'

const Hero = () => {
  return (
    <>
     <video autoPlay loop muted>
        <source src={hero} type="video/mp4" />
      </video>
      <div className='hero'>
        <h1>SyncFit MSA</h1>
        <CustomLink to={"/emotion"} className={"hero-link"} text={"Try now"}/>
      </div>
    </>
  )
}

export default Hero;
