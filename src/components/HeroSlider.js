import React from 'react';
//import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';
//import swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
//import modules
import { EffecFade, Autoplay} from 'swiper';
//import images
import Img1 from '../assets/img/heroSlider/1.jpg';
import Img2 from '../assets/img/heroSlider/2.jpg';
import Img3 from '../assets/img/heroSlider/3.jpg';


const slides = [
  {
    title: "Mzansi's Luxury Hotels For Vacation",
    bg: Img1,
    btnText: 'Book Now'
  },
  {
    title: "Discover Paradise",
    bg: Img2,
    btnText: 'Explore More'
  },
  {
    title: "Experience South African Grandeur",
    bg: Img3,
    btnText: 'Check Availability'
  }

];

const HeroSlider = () => {
  return (
    <Swiper className='heroSlider h-[600px] lg:h-[860px]'>
      {slides.map((slide, index) => {
        //destructure slide
        const { title, bg, btnText } = slide
        return (
          <SwiperSlide className='h-full bg-pink-400 relative flex justity-center items-center' key={index}>
            <div className='z-30 text-white text-center'>
              <div className='uppercase font-tertiary tracking-[6px] mb-5'>
                Just Enjoy and relax
              </div>
              <h1 className='text-[32px]'>{ title }</h1>
            </div>
            
            <div className='absolute top-0 w-full h-full'>
              <img className='object-cover h-full w-full' src={bg} alt=''/>
            </div>
            {/* overlay */}
            <div className='absolute w-full h-full bg-black/70'></div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
};

export default HeroSlider;
