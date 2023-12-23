import { useEffect, useRef, useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './styles.css';

const slides = ['One', "Two", "Three", "Four"];

export const Carousel = () => {
  const containerElm = useRef(null);
  const [containerWidth, setContainerWidth] = useState();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = containerElm?.current.clientWidth;

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
              <div className="eachSlide" style={{ width: containerWidth, backgroundColor: "pink" }}>
                {slide}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}