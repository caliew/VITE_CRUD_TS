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
  SourceName,
}) => {
  const [showEnlargedImage, setShowEnlargedImage] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const handleImageClick = (image) => {
    setEnlargedImage(image);
    setShowEnlargedImage(true);
  };

  const handleCloseEnlargedImage = () => {
    setShowEnlargedImage(false);
  };

  return (
    <section>
      <div className="SourceName">{SourceName}</div>
      <div className="section">
        {images.map((image, index) => (
          <img
            className={`slide-image-${images.length}`}
            src={`http://localhost:8080/images/${image}`}
            key={index}
            onClick={() => handleImageClick(image)}
          />
        ))}
        {showEnlargedImage && (
          <div
            className="enlarged-image-popup"
            onClick={handleCloseEnlargedImage}
          >
            <img src={`http://localhost:8080/images/${enlargedImage}`} />
          </div>
        )}
        <div
          className={`text-overlay fragment ${
            currentSlide === slideId ? "visible" : ""
          }`}
          data-fragment-index="2"
        >
          {" "}
          <div>
            {slideId}/{storyId}
          </div>
          <div className="title">
            {title}
            <br />
            {description}
          </div>
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
};

const transitions = ["fade", "slide", "convex", "concave", "zoom"];
enum VideoMode {
  PLAY,
  PAUSE,
}
const SlideShow = () => {
  const [slides, setSlides] = useState([]);
  const [stories, setStories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [modeVideo, setModeVideo] = useState(VideoMode.PAUSE);
  const revealRef = useRef<HTMLDivElement>(null);
  const revealInstance = useRef<Reveal | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (revealRef.current) {
      revealInstance.current = new Reveal(revealRef.current);
      revealInstance.current.initialize();
      revealInstance.current.configure({
        fragments: false,
      });
      revealInstance.current.on("ready", () => {
        const state = revealInstance.current.getState();
        const currentSlide = state.indexh ?? 0;
        setCurrentSlide(currentSlide);
      });
      revealInstance.current.on("slidechanged", (event) => {
        const currentSlide = event.indexh;
        const slides = revealInstance.current.getSlides();
        slides.forEach((slide, index) => {
          const fragment = slide.querySelector(".text-overlay.fragment");
          if (fragment && fragment.classList) {
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
    fetchStoryAndData();
  }, []);
  const fetchStoryAndData = async () => {
    try {
      const storyResponse = await fetch("http://localhost:8080/story.json");
      const story = await storyResponse.json();
      const activeStory = story.filter((s) => s?.active === true); // changed to boolean true
      setStories(activeStory);

      const dataResponse = await fetch("http://localhost:8080/photoData.json");
      const data = await dataResponse.json();
      const slides = [];
      let storyIndex = 0;
      let images = [];
      let slideLength = Math.floor(Math.random() * 4) + 1;
      if (slideLength === 3) slideLength = 2;
      for (let i = 0; i < data.length; i++) {
        const fileName = data[i].filename;
        const SourceName = fileName.split("_snapshot")[0];
        images.push(fileName);
        if (images.length === slideLength || i === data.length - 1) {
          const storyData = activeStory[storyIndex];
          slides.push({
            id: storyData.id,
            title: storyData.title,
            content: storyData.content,
            description: storyData.description,
            filename: data[i].filename,
            images,
            SourceName,
          });
          images = [];
          storyIndex = (storyIndex + 1) % activeStory.length;
          slideLength = Math.floor(Math.random() * 4) + 1;
          if (slideLength === 3) slideLength = 2;
        }
      }
      setSlides(slides);
      setTotalSlides(slides.length);
      goFirstSlide();
    } catch (error) {}
  };
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
      const currentSlide = state.indexh ?? 0;
      setCurrentSlide(currentSlide);
      revealInstance.current.configure({ rtl: false });
      const randomTransition =
        transitions[Math.floor(Math.random() * transitions.length)];
      revealInstance.current.configure({ transition: randomTransition });
      if (currentSlide === 0) {
        revealInstance.current.slide(totalSlides);
      } else {
        revealInstance.current.slide(currentSlide - 1);
      }
    }
  };
  const handleNextSlide = () => {
    if (revealRef.current && revealInstance.current) {
      const state = revealInstance.current.getState();
      const currentSlide = state.indexh ?? 0;
      setCurrentSlide(currentSlide);
      revealInstance.current.configure({ rtl: false });
      const randomTransition =
        transitions[Math.floor(Math.random() * transitions.length)];
      revealInstance.current.configure({ transition: randomTransition });
      if (currentSlide === totalSlides - 1) {
        revealInstance.current.slide(0);
      } else {
        revealInstance.current.slide(currentSlide + 1);
      }
    }
  };

  const startOrRestartTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setModeVideo(VideoMode.PLAY);
    timerRef.current = setInterval(handleNextSlide, 3000); // 10 seconds
  };
  const StopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setModeVideo(VideoMode.PAUSE);
  };
  const handleVideoToggle = () => {
    if (modeVideo === VideoMode.PLAY) {
      StopTimer();
    } else {
      startOrRestartTimer();
    }
  };

  return (
    <>
      <div className="font-Roboto text-lg text-white font-extralight flex justify-center items-center mt-4 gap-4">
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses} to="/">
          HOME
        </Button>
        <Button
          className={ButtonLINKClasses}
          onClick={() => fetchStoryAndData()}
        >
          RELOAD
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
        <Button
          Icon={GetIcon(
            modeVideo === VideoMode.PLAY ? "VideoPause" : "VideoPlay"
          )}
          className={`${ButtonLINKClasses} size-24 w-36`}
          onClick={() => handleVideoToggle()}
        >
          {currentSlide}/{totalSlides - 1}
        </Button>
        <Button className={ButtonLINKClasses} onClick={() => handleNextSlide()}>
          NEXT {currentSlide >= totalSlides - 1 ? 0 : currentSlide + 1}
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
              SourceName={slide.SourceName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SlideShow;
