import React, { useEffect, useState, useRef } from "react";
import Reveal from "reveal.js";
import Slide from "./Slide";
import "reveal.js/dist/reveal.css";
import "./styles.css";
import { Button } from "@shared/components";
import { ButtonLINKClasses } from "@shared/utils/classname";
import { GetIcon } from "@shared/utils/icon";

const PORT = 8080;
const FETCH_BASE = `http://localhost:${PORT}`;

const transitions = ["fade", "slide", "convex", "concave", "zoom"];

const VideoMode = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
};

const SlideShow = () => {
  const [slides, setSlides] = useState([]);
  const [stories, setStories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modeVideo, setModeVideo] = useState(VideoMode.PAUSE);

  const revealRef = useRef(null);
  const revealInstance = useRef(null);
  const timerRef = useRef(null);

  // Fetch stories once on mount
  useEffect(() => {
    fetchStories();
  }, []);

  // Fetch slides whenever stories updated
  useEffect(() => {
    if (stories.length > 0) {
      fetchSlides();
    }
  }, [stories]);

  // Initialize Reveal once slides are ready
  useEffect(() => {
    if (revealRef.current && slides.length > 0) {
      revealInstance.current = new Reveal(revealRef.current);
      revealInstance.current.initialize();
      revealInstance.current.configure({ fragments: false });

      revealInstance.current.on("ready", () => {
        const state = revealInstance.current.getState();
        setCurrentSlide(state.indexh || 0);
      });

      revealInstance.current.on("slidechanged", (event) => {
        const current = event.indexh || 0;
        setCurrentSlide(current);

        const allSlides = revealInstance.current.getSlides();
        allSlides.forEach((slide, idx) => {
          const fragment = slide.querySelector(".text-overlay.fragment");
          if (fragment) {
            if (idx === current) fragment.classList.add("visible");
            else fragment.classList.remove("visible");
          }
        });
      });

      stopTimer(); // stop auto play on init
    }

    return () => {
      stopTimer();
    };
  }, [slides]);

  const fetchStories = async () => {
    try {
      const res = await fetch(`${FETCH_BASE}/storyData.json`);
      const data = await res.json();
      const activeStories = data.filter((s) => s.active === true);
      setStories(activeStories);
    } catch (e) {
      console.error("Failed to fetch stories:", e);
    }
  };

  const fetchSlides = async () => {
    try {
      const res = await fetch(`${FETCH_BASE}/photoData.json`);
      const photoData = await res.json();

      let slidesBuilt = [];
      let images = [];
      let storyIndex = 0;

      // Random slide length logic: 1,2 or 4 images per slide (never 3)
      const getRandomSlideLength = () => {
        let len = Math.floor(Math.random() * 4) + 1;
        if (len === 3) len = 2;
        return len;
      };

      let slideLength = getRandomSlideLength();

      for (let i = 0; i < photoData.length; i++) {
        const filename = photoData[i].filename;
        images.push(filename);

        if (images.length === slideLength || i === photoData.length - 1) {
          const story = stories[storyIndex];
          slidesBuilt.push({
            id: story.id,
            title: story.title,
            content: story.content,
            description: story.description,
            images: [...images],
            sourceName: filename.split("_snapshot")[0],
          });
          images = [];
          storyIndex = (storyIndex + 1) % stories.length;
          slideLength = getRandomSlideLength();
        }
      }

      setSlides(slidesBuilt);
      goToSlide(0);
    } catch (e) {
      console.error("Failed to fetch slides:", e);
    }
  };

  const goToSlide = (index) => {
    if (revealInstance.current) {
      const randomTransition =
        transitions[Math.floor(Math.random() * transitions.length)];
      revealInstance.current.configure({ transition: randomTransition });
      revealInstance.current.slide(index);
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    if (!revealInstance.current) return;
    const state = revealInstance.current.getState();
    const current = state.indexh || 0;
    const next = current >= slides.length - 1 ? 0 : current + 1;
    goToSlide(next);
  };

  const previousSlide = () => {
    if (!revealInstance.current) return;
    const state = revealInstance.current.getState();
    const current = state.indexh || 0;
    const prev = current === 0 ? slides.length - 1 : current - 1;
    goToSlide(prev);
  };

  const startTimer = () => {
    stopTimer();
    setModeVideo(VideoMode.PLAY);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 2000); // 10 seconds
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setModeVideo(VideoMode.PAUSE);
  };

  const toggleVideoMode = () => {
    if (modeVideo === VideoMode.PLAY) stopTimer();
    else startTimer();
  };

  return (
    <>
      <div className="controls font-Roboto text-lg text-white font-extralight flex justify-center items-center mt-4 gap-4">
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses} to="/">
          HOME
        </Button>
        <Button className={ButtonLINKClasses} onClick={() => fetchSlides()}>
          RELOAD
        </Button>
        <Button className={ButtonLINKClasses} onClick={() => goToSlide(0)}>
          FIRST
        </Button>
        <Button
          className={ButtonLINKClasses}
          onClick={() => goToSlide(slides.length - 1)}
        >
          LAST
        </Button>
        <Button className={ButtonLINKClasses} onClick={previousSlide}>
          PREVIOUS {currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1}
        </Button>
        <Button
          Icon={GetIcon(
            modeVideo === VideoMode.PLAY ? "VideoPause" : "VideoPlay"
          )}
          className={ButtonLINKClasses}
          iconClassName="size-10 text-red-500"
          onClick={toggleVideoMode}
        >
          {currentSlide} / {slides.length - 1}
        </Button>
        <Button className={ButtonLINKClasses} onClick={nextSlide}>
          NEXT {currentSlide >= slides.length - 1 ? 0 : currentSlide + 1}
        </Button>
      </div>

      <div
        ref={revealRef}
        className="reveal bg-black"
        style={{ width: "100%", height: "90vh" }}
      >
        <div className="slides bg-black flex">
          {slides.map((slide, idx) => (
            <Slide
              key={idx}
              slideId={idx}
              storyId={slide.id}
              title={slide.title}
              images={slide.images}
              content={slide.content}
              description={slide.description}
              currentSlide={currentSlide}
              sourceName={slide.sourceName}
              port={PORT}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SlideShow;
