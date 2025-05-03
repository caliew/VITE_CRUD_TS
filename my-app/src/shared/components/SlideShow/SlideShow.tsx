import { useEffect, useState, useRef } from "react";
import Reveal from "reveal.js";
import { Button } from "@shared/components";

import "reveal.js/dist/reveal.css";
import "./styles.css";
import { ButtonLINKClasses } from "@shared/utils/classname";
import { GetIcon } from "@shared/utils/icon";

const Slide = ({
  slideId,
  storyId,
  id,
  images,
  title,
  content,
  description,
  currentSlide,
}) => (
  <section>
    <div className="section">
      {images.map((image, index) => (
        <img
          className="slide-image"
          src={`http://localhost:8080/images/${image}`}
          key={index}
        />
      ))}
      <div
        className={`text-overlay fragment ${
          currentSlide === slideId ? "visible" : ""
        }`}
        data-fragment-index="2"
      >
        {" "}
        <div>{slideId}</div>
        <h2>{title}</h2>
        <h3>
          {storyId}
          <br />
          {description}
        </h3>
        <p>{content}</p>
      </div>
    </div>
  </section>
);
const transitions = ["fade", "slide", "convex", "concave", "zoom"];

const SlideShow = () => {
  const [slides, setSlides] = useState([]);
  const [stories, setStories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const revealRef = useRef<HTMLDivElement>(null);
  const revealInstance = useRef<Reveal | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (revealRef.current) {
      revealInstance.current = new Reveal(revealRef.current);
      revealInstance.current.initialize();
      revealInstance.current.configure({
        fragments: true,
      });
      revealInstance.current.on("slidechanged", (event) => {
        const currentSlide = event.indexh;
        const slides = revealInstance.current.getSlides();
        slides.forEach((slide, index) => {
          const fragment = slide.querySelector(".text-overlay.fragment");
          if (fragment) {
            if (index === currentSlide) {
              fragment.classList.add("visible");
            } else {
              fragment.classList.remove("visible");
            }
          }
        });
      });
      StopTimer();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchStoryAndData = async () => {
      try {
        const storyResponse = await fetch("http://localhost:8080/story.json");
        const story = await storyResponse.json();
        setStories(story);

        const dataResponse = await fetch("http://localhost:8080/data.json");
        const data = await dataResponse.json();
        const slides = [];
        let storyIndex = 0;
        let images = [];
        let slideLength = Math.floor(Math.random() * 4) + 1;
        for (let i = 0; i < data.length; i++) {
          images.push(data[i].filename);
          if (images.length === slideLength || i === data.length - 1) {
            const storyData = story[storyIndex];
            slides.push({
              id: storyData.id,
              title: storyData.title,
              content: storyData.content,
              description: storyData.description,
              images,
            });
            images = [];
            storyIndex = (storyIndex + 1) % story.length;
            slideLength = Math.floor(Math.random() * 4) + 1;
          }
        }
        setSlides(slides);
        setTotalSlides(slides.length);
      } catch (error) {}
    };

    fetchStoryAndData();
  }, []);

  const goFirstSlide = () => {
    if (revealRef.current && revealInstance.current) {
      revealInstance.current.configure({ rtl: false });
      const randomTransition =
        transitions[Math.floor(Math.random() * transitions.length)];
      revealInstance.current.configure({ transition: randomTransition });
      revealInstance.current.slide(0);
      setCurrentSlide(0);
    }
  };
  const goLastSlide = () => {
    if (revealRef.current && revealInstance.current) {
      const slides = revealInstance.current.getSlides();
      const totalSlides = slides.length;
      revealInstance.current.configure({ rtl: false });
      const randomTransition =
        transitions[Math.floor(Math.random() * transitions.length)];
      revealInstance.current.configure({ transition: randomTransition });
      revealInstance.current.slide(totalSlides - 1);
      setCurrentSlide(totalSlides - 1);
    }
  };
  const handlePreviousSlide = () => {
    if (revealRef.current && revealInstance.current) {
      const state = revealInstance.current.getState();
      const currentSlide = state.indexh;
      setCurrentSlide(currentSlide);
      revealInstance.current.configure({ rtl: false });
      const randomTransition =
        transitions[Math.floor(Math.random() * transitions.length)];
      revealInstance.current.configure({ transition: randomTransition });
      if (currentSlide === 0) {
        revealInstance.current.slide(totalSlides);
      } else {
        revealInstance.current.slide((currentSlide - 1) % totalSlides);
      }
    }
  };
  const handleNextSlide = () => {
    if (revealRef.current && revealInstance.current) {
      const state = revealInstance.current.getState();
      const currentSlide = state.indexh;
      setCurrentSlide(currentSlide);
      revealInstance.current.configure({ rtl: false });
      const randomTransition =
        transitions[Math.floor(Math.random() * transitions.length)];
      revealInstance.current.configure({ transition: randomTransition });
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
    timerRef.current = setInterval(handleNextSlide, 5000); // 10 seconds
  };
  const StopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <>
      <div className="font-Roboto text-lg text-white font-extralight flex justify-center items-center mt-4 gap-4">
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses} to="/">
          BACK TO HOME
        </Button>
        <Button className={ButtonLINKClasses} onClick={() => goFirstSlide()}>
          FIRST
        </Button>
        <Button className={ButtonLINKClasses} onClick={() => goLastSlide()}>
          LAST
        </Button>
        <Button
          className={ButtonLINKClasses}
          onClick={() => handlePreviousSlide()}
        >
          PREVIOUS {currentSlide - 1 < 0 ? totalSlides - 1 : currentSlide - 1}
        </Button>
        <h1>
          {currentSlide}/{totalSlides - 1}
        </h1>
        <Button className={ButtonLINKClasses} onClick={() => handleNextSlide()}>
          NEXT {currentSlide >= totalSlides - 1 ? 0 : currentSlide + 1}
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
            <Slide
              key={index}
              slideId={index}
              storyId={slide.id}
              title={slide.title}
              images={slide.images}
              content={slide.content}
              description={slide.description}
              currentSlide={currentSlide}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SlideShow;
