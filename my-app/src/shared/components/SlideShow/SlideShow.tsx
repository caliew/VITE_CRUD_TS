import React, { useRef } from "react";
import Reveal from "reveal.js";
import { Button } from "@shared/components";

import "reveal.js/dist/reveal.css";
import "./styles.css";
import { ButtonLINKClasses } from "@shared/utils/classname";

const Slide = ({ images, title }) => (
  <section>
    <div className="section">
      {images.map((image, index) => (
        <img
          className="slide-image"
          src={`http://localhost:8080/images/${image}`}
          key={index}
        />
      ))}
    </div>
  </section>
);

const slides = [
  { title: "Slide 1", images: ["1.png"] },
  { title: "Slide 1", images: ["2.png", "3.png"] },
  { title: "Slide 1", images: ["4.png", "5.png", "6.png"] },
  { title: "Slide 2", images: ["7.png", "8.png", "9.png", "10.png"] },
  { title: "Slide 3", images: ["11.png", "12.png", "13.png", "14.png"] },
  { title: "Slide 4", images: ["15.png", "16.png", "17.png"] },
  { title: "Slide 5", images: ["18.png", "19.png"] },
  { title: "Slide 5", images: ["20.png"] },
];

const SlideShow = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const revealInstance = useRef<Reveal | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (revealRef.current) {
      revealInstance.current = new Reveal(revealRef.current);
      revealInstance.current.initialize();
      startOrRestartTimer();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleNextSlide = () => {
    if (revealRef.current && revealInstance.current) {
      const state = revealInstance.current.getState();
      const currentSlide = state.indexh;
      const slides = revealInstance.current.getSlides();
      const totalSlides = slides.length;
      revealInstance.current.configure({ rtl: false });
      if (currentSlide === totalSlides - 1) {
        revealInstance.current.slide(0);
      } else {
        revealInstance.current.slide((currentSlide + 1) % totalSlides);
      }
    }
  };

  const startOrRestartTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(handleNextSlide, 2000); // 3 seconds
  };
  const StopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <>
      <div className="font-Roboto text-lg text-white font-extralight flex justify-center items-center mt-4 gap-4">
        <Button className={ButtonLINKClasses} onClick={() => handleNextSlide()}>
          NEXT
        </Button>
        <Button className={ButtonLINKClasses} onClick={() => StopTimer()}>
          STOP
        </Button>
        <Button
          className={ButtonLINKClasses}
          onClick={() => startOrRestartTimer()}
        >
          START
        </Button>
      </div>
      <div
        ref={revealRef}
        className="reveal bg-black"
        style={{ width: "100%", height: "90vh" }}
      >
        <div className="slides bg-black flex">
          {slides.map((slide, index) => (
            <Slide key={index} title={slide.title} images={slide.images} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SlideShow;
