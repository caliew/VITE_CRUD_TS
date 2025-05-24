import React, { useEffect, useState, useRef } from "react";
import Reveal from "reveal.js";
import Slide from "./Slide";
import "reveal.js/dist/reveal.css";
import "./styles.css";
import { Button } from "@shared/components";
import { ButtonLINKClasses } from "@shared/utils/classname";
import { GetIcon } from "@shared/utils/icon";
import NavigationBar from "./NavigationBar"; // import the new component

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
  const [remainingTime, setRemainingTime] = useState(null);

  const revealRef = useRef(null);
  const revealInstance = useRef(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null); // ✅ Add this to fix the error

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
      let photoIndex = 0; // index to track position in photoData

      for (let storyIndex = 0; storyIndex < stories.length; storyIndex++) {
        const story = stories[storyIndex];
        const imagesCount = story.images || 1; // fallback to 1 image if undefined
        const paragraphs = story.paragraph || [];

        // Extract imagesCount images from photoData starting at photoIndex
        const images = [];
        for (
          let i = 0;
          i < imagesCount && photoIndex < photoData.length;
          i++, photoIndex++
        ) {
          images.push(photoData[photoIndex].filename);
        }

        // Build content string from paragraphs array, join with line breaks or spaces
        const contentText =
          paragraphs.length > 0 ? paragraphs.join("\n\n") : story.content || "";

        slidesBuilt.push({
          id: story.id,
          title: story.title,
          content: contentText,
          description: story.description,
          duration: story.duration,
          images,
          sourceName: images.length > 0 ? images[0].split("_snapshot")[0] : "",
        });
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

  // --- UPDATED TIMER LOGIC BELOW ---

  // Clear existing timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRemainingTime(null);
    setModeVideo(VideoMode.PAUSE);
  };

  // Start or restart timer for current slide's duration
  const startTimer = () => {
    stopTimer();
    setModeVideo(VideoMode.PLAY);
    scheduleNextSlide();
  };

  // Schedule advancing to next slide after current slide's duration

  const scheduleNextSlide = () => {
    if (!slides.length) return;

    const duration = slides[currentSlide]?.duration || 5; // seconds
    console.log(
      `Starting timer for slide ${currentSlide}, duration: ${duration}s`
    );

    setRemainingTime(duration);

    // Clear any previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, duration * 1000);
  };

  // When currentSlide changes AND mode is PLAY, restart timer with new slide's duration
  useEffect(() => {
    if (modeVideo === VideoMode.PLAY) {
      scheduleNextSlide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  // When toggling playback mode
  const toggleVideoMode = () => {
    if (modeVideo === VideoMode.PLAY) stopTimer();
    else startTimer();
  };

  // --- END UPDATED TIMER LOGIC ---
  return (
    <>
      <NavigationBar
        currentSlide={currentSlide}
        slidesLength={slides.length}
        modeVideo={modeVideo}
        VideoMode={VideoMode}
        remainingTime={remainingTime}
        onHome={() => {}}
        onReload={() => fetchSlides()}
        onFirst={() => goToSlide(0)}
        onLast={() => goToSlide(slides.length - 1)}
        onPrevious={previousSlide}
        onTogglePlay={toggleVideoMode}
        onNext={nextSlide}
      />
      <div
        ref={revealRef}
        className="reveal bg-black"
        style={{ width: "100%", height: "90vh" }}
      >
        <div className="slides bg-black">
          {slides.map((slide, idx) => (
            <section key={idx}>
              <Slide
                slideId={idx}
                storyId={slide.id}
                title={slide.title}
                images={slide.images}
                content={slide.content}
                duration={slide.duration}
                description={slide.description}
                currentSlide={currentSlide}
                sourceName={slide.sourceName}
                port={PORT}
              />
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default SlideShow;
