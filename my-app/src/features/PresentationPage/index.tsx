import React, { useRef } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";

const PresentationPage = () => {
  const revealRef = React.createRef<HTMLDivElement>(null);
  const revealInstance = useRef<Reveal | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (revealRef.current) {
      revealInstance.current = new Reveal(revealRef.current);
      revealInstance.current.initialize();
      timerRef.current = setInterval(handleNextSlide, 3000); // 3 seconds
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
      if (currentSlide === totalSlides - 1) {
        revealInstance.current.configure({ rtl: false });
        revealInstance.current.slide(0);
      } else {
        revealInstance.current.configure({ rtl: true });
        revealInstance.current.slide(currentSlide + 1);
      }
    }
  };

  return (
    <div
      ref={revealRef}
      className="reveal"
      style={{ width: "100%", height: "100vh" }}
    >
      <div className="slides">
        <section>
          <h2>Slide 1</h2>
          <button onClick={handleNextSlide}>Next Slide</button>
        </section>
        <section>
          <h2>Slide 2</h2>
          <button onClick={handleNextSlide}>Next Slide</button>
        </section>
        <section>
          <h2>Slide 3</h2>
          <button onClick={handleNextSlide}>Next Slide</button>
        </section>
      </div>
    </div>
  );
};

export default PresentationPage;
