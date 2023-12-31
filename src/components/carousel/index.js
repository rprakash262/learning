import { useEffect, useRef, useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './styles.css';

import BannerImg1 from '../../data/banner1.jpg';
import BannerImg2 from '../../data/banner2.jpg';
import BannerImg3 from '../../data/banner3.jpg';
import BannerImg4 from '../../data/banner4.jpg';

const slides = [BannerImg1, BannerImg2, BannerImg3, BannerImg4];

export const Carousel = () => {
  const containerElm = useRef(null);
  const [containerWidth, setContainerWidth] = useState();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = containerElm?.current?.clientWidth;

      setContainerWidth(width);
    })
  }, [])

  useEffect(() => {
    const width = containerElm?.current.clientWidth;

    setContainerWidth(width);
  }, [containerElm]);

  const slideRight = () => {
    if (activeSlideIndex === (slides.length - 1)) {
      return;
    }
    setLeft(left - containerWidth)
    setActiveSlideIndex(activeSlideIndex + 1)
  }

  const slideLeft = () => {
    if (activeSlideIndex === 0) {
      return;
    }
    setLeft(left + containerWidth)
    setActiveSlideIndex(activeSlideIndex - 1)
  }

  console.log({containerElm: containerElm.current, containerWidth, windowWidth: window.innerWidth})
  return (
    <div className="carouselContainer" ref={containerElm}>
      {containerWidth > 0 && (
        <>
          <div className="leftControl" onClick={slideLeft}>
            <ArrowBackIos />
          </div>
          <div className="rightControl" onClick={slideRight}>
            <ArrowForwardIos />
          </div>
          <div className="carouselContent" style={{ width: containerWidth * 4, left }}>
            {slides.map((slide) => (
              <div className="eachSlide" style={{ width: containerWidth }}>
                <p>You can add images here.</p>
                {/* <p>Image {slide}</p> */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}