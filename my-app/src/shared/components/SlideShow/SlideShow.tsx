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
      const resPhotos = await fetch(`${FETCH_BASE}/data/photoData.json`);
      const photoData = await resPhotos.json();

      // Group photoData by filename prefix before "_"
      const photoGroups: { [key: string]: string[] } = {};
      photoData.forEach((photo: any) => {
        const baseName = photo.filename.replace(/_[^_]+$/, "");
        if (!photoGroups[baseName]) photoGroups[baseName] = [];
        photoGroups[baseName].push(photo.filename);
      });

      const slidesBuilt = [];

      for (let storyIndex = 0; storyIndex < stories.length; storyIndex++) {
        const story = stories[storyIndex];
        const group = photoGroups[story.source];
        if (!group) continue; // skip if no matching photo group

        // Parse the image range string like "0-15"
        let startIndex = 0;
        let endIndex = 0;
        if (typeof story.images === "string" && story.images.includes("-")) {
          const [startStr, endStr] = story.images.split("-");
          const parsedStart = parseInt(startStr, 10);
          const parsedEnd = parseInt(endStr, 10);

          if (
            !isNaN(parsedStart) &&
            !isNaN(parsedEnd) &&
            parsedEnd >= parsedStart
          ) {
            startIndex = parsedStart;
            endIndex = Math.min(parsedEnd, group.length - 1); // cap to max available
          }
        }

        const selectedImages = group.slice(startIndex, endIndex + 1); // inclusive

        slidesBuilt.push({
          id: story.id,
          title: story.title,
          paragraphs: story.paragraph,
          content: story.content,
          description: story.description,
          duration: story.duration,
          images: selectedImages,
          sourceName: story.source,
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

  const updateStoryData = async (storyData) => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/updateStoryData",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(storyData),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return null;
    }
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
                editable={true}
                modeVideo={modeVideo} // ⬅️ Pass this
                updateStoryData={updateStoryData}
              />
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default SlideShow;
