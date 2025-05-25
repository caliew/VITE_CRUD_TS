import { useEffect, useState, useRef } from "react";
import Reveal from "reveal.js";
import Slide from "./Slide";
import "reveal.js/dist/reveal.css";
import "./styles.css";
import NavigationBar from "./NavigationBar"; // import the new component

const PORT = 5000;
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
  const modeVideoRef = useRef(VideoMode.PAUSE);

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

      clearSlideTimer(); // stop auto play on init
    }

    return () => {
      clearSlideTimer();
    };
  }, [slides]);

  const fetchStories = async () => {
    try {
      const res = await fetch(`${FETCH_BASE}/data/storyData.json`);
      const data = await res.json();
      const activeStories = data.filter((s) => s.active === true);
      setStories(activeStories);
    } catch (e) {
      console.error("Failed to fetch stories:", e);
    }
  };

  const fetchSlides = async () => {
    try {
      const res = await fetch(`${FETCH_BASE}/data/photoData.json`);
      const photoData = await res.json();

      let slidesBuilt = [];
      let photoIndex = 0; // index to track position in photoData

      for (let storyIndex = 0; storyIndex < stories.length; storyIndex++) {
        const story = stories[storyIndex];
        const imagesCount = story.images || 1; // fallback to 1 image if undefined

        // Extract imagesCount images from photoData starting at photoIndex
        const images = [];
        for (
          let i = 0;
          i < imagesCount && photoIndex < photoData.length;
          i++, photoIndex++
        ) {
          images.push(photoData[photoIndex].filename);
        }

        slidesBuilt.push({
          id: story.id,
          title: story.title,
          paragraphs: story.paragraph,
          content: story.content,
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
    clearSlideTimer(); // 🔴 stop current timers
    const state = revealInstance.current.getState();
    const current = state.indexh || 0;
    const next = current >= slides.length - 1 ? 0 : current + 1;
    goToSlide(next);
    // Restart timer if in PLAY mode
    console.log(modeVideoRef.current);
    if (modeVideoRef.current === VideoMode.PLAY) {
      startTimer();
    }
  };

  const previousSlide = () => {
    if (!revealInstance.current) return;
    clearSlideTimer(); // 🔴 stop current timers
    const state = revealInstance.current.getState();
    const current = state.indexh || 0;
    const prev = current === 0 ? slides.length - 1 : current - 1;
    goToSlide(prev);
    // Restart timer if in PLAY mode
    if (modeVideoRef.current === VideoMode.PLAY) {
      startTimer();
    }
  };

  // --- UPDATED TIMER LOGIC BELOW ---

  const clearSlideTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  // Use this ONLY when user clicks "Pause"
  const stopSlideshow = () => {
    clearSlideTimer();
    setModeVideo(VideoMode.PAUSE);
  };

  // Start or restart timer for current slide's duration
  const startTimer = () => {
    clearSlideTimer();
    setModeVideo(VideoMode.PLAY);
    modeVideoRef.current = VideoMode.PLAY;
    scheduleNextSlide(); // ← Move here for clarity
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
    if (modeVideoRef.current === VideoMode.PLAY) {
      scheduleNextSlide();
    }
  }, [currentSlide]);

  useEffect(() => {
    modeVideoRef.current = modeVideo;
  }, [modeVideo]);
  // When toggling playback mode
  const toggleVideoMode = () => {
    if (modeVideo === VideoMode.PLAY) stopSlideshow();
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
                paragraphs={slide.paragraphs}
                content={slide.content}
                duration={slide.duration}
                description={slide.description}
                currentSlide={currentSlide}
                sourceName={slide.sourceName}
                port={PORT}
                modeVideo={modeVideo} // ⬅️ Pass this
              />
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default SlideShow;
