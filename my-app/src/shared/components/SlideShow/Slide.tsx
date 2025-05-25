import React, { useState, useEffect, useRef } from "react";
import EnlargedImagePopup from "./EnlargedImagePopup";
import "./styles.css";

interface SlideProps {
  slideId: number;
  storyId: number;
  images: string[];
  title: string;
  content: string;
  paragraphs: string[];
  description: string;
  currentSlide: number;
  sourceName: string;
  duration?: number; // in seconds
  port?: number;
  modeVideo?: "PLAY" | "PAUSE"; // ⬅️ Add this line
}

const Slide: React.FC<SlideProps> = ({
  slideId,
  storyId,
  images,
  title,
  content,
  paragraphs,
  description,
  currentSlide,
  sourceName,
  duration = 10, // default duration in seconds
  port = 8080,
  modeVideo = { modeVideo }, // ⬅️ Pass this
}) => {
  const [showEnlargedImage, setShowEnlargedImage] = useState(false);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState(0);

  const [slideshowActive, setSlideshowActive] = useState(true);
  const [slideshowImageIndex, setSlideshowImageIndex] = useState(0);
  const [slideshowParagraphIndex, setSlideshowParagraphIndex] = useState(0);

  const imageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const paragraphTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (modeVideo === "PLAY") {
      startSlideshow();
    } else {
      stopSlideshow();
    }
  }, [modeVideo, currentSlide]);

  const handleImageClick = (index: number) => {
    setEnlargedImageIndex(index);
    setShowEnlargedImage(true);
  };

  const handleClose = () => setShowEnlargedImage(false);

  const handleSnapshot = () => {
    const enlargedImage = images[enlargedImageIndex];
    const url = `http://localhost:${port}/images/${enlargedImage}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = enlargedImage.replace(/\//g, "_");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRewind = () => {
    setEnlargedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleForward = () => {
    setEnlargedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const startSlideshow = () => {
    setSlideshowActive(true);
    setSlideshowImageIndex(0);
    setSlideshowParagraphIndex(0);

    const totalDurationMs = duration * 1000;
    const imageCount = images.length;
    const paragraphCount = paragraphs.length;
    const MIN_IMAGE_INTERVAL = 300; // ms
    const MIN_PARAGRAPH_INTERVAL = 500; // ms

    const imageInterval =
      imageCount > 0
        ? Math.max(MIN_IMAGE_INTERVAL, totalDurationMs / imageCount)
        : 3000;
    const paragraphInterval =
      paragraphCount > 0
        ? Math.max(MIN_PARAGRAPH_INTERVAL, totalDurationMs / paragraphCount)
        : 4000;

    if (imageTimerRef.current) clearInterval(imageTimerRef.current);
    if (paragraphTimerRef.current) clearInterval(paragraphTimerRef.current);

    imageTimerRef.current = setInterval(() => {
      setSlideshowImageIndex((prev) => (prev + 1) % imageCount);
    }, imageInterval);

    paragraphTimerRef.current = setInterval(() => {
      setSlideshowParagraphIndex((prev) => (prev + 1) % paragraphCount);
    }, paragraphInterval);
  };

  const stopSlideshow = () => {
    setSlideshowActive(false);
    if (imageTimerRef.current) clearInterval(imageTimerRef.current);
    if (paragraphTimerRef.current) clearInterval(paragraphTimerRef.current);
  };

  const renderContent = () => {
    if (!content) return null;
    const trimmed = content.trim();
    if (trimmed.length <= 100) return <p>{trimmed}</p>;
    return (
      <p>
        {trimmed.slice(0, 50)} ... {trimmed.slice(trimmed.length - 50)}
      </p>
    );
  };
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "..." + text.slice(-maxLength);
  };

  const slideShowControl = () => {
    return (
      <div
        className="slideshow-control"
        style={{ textAlign: "center", marginTop: 10 }}
      >
        {!slideshowActive ? (
          <button onClick={startSlideshow} className="slideshow-btn">
            Start Slideshow
          </button>
        ) : (
          <button onClick={stopSlideshow} className="slideshow-btn">
            Stop Slideshow
          </button>
        )}
      </div>
    );
  };

  return (
    <section data-transition="fade">
      <div className="source-name">{sourceName.split("_")[0]}</div>

      <div className="section">
        {slideshowActive && images.length > 0 ? (
          <div className="image-text-overlay-wrapper">
            <img
              className="slide-image large overlay-image"
              src={`http://localhost:${port}/images/${images[slideshowImageIndex]}`}
              alt={`slideshow-${slideshowImageIndex}`}
            />
            {paragraphs.length > 0 && (
              <p className="paragraph-item overlay-text">
                {paragraphs[slideshowParagraphIndex]}
              </p>
            )}
          </div>
        ) : (
          !slideshowActive &&
          images.map((image, idx) => {
            const isLarge = idx % 5 === 0;
            return (
              <img
                key={idx}
                className={`slide-image ${isLarge ? "large" : ""}`}
                src={`http://localhost:${port}/images/${image}`}
                alt={image}
                onClick={() => handleImageClick(idx)}
              />
            );
          })
        )}

        {showEnlargedImage && (
          <EnlargedImagePopup
            images={images}
            enlargedImageIndex={enlargedImageIndex}
            port={port}
            onClose={handleClose}
            onRewind={handleRewind}
            onForward={handleForward}
            onSnapshot={handleSnapshot}
          />
        )}

        <div
          className={`text-overlay fragment ${
            currentSlide === slideId ? "visible" : ""
          }`}
          data-fragment-index={2}
        >
          {slideShowControl()}
          <div>
            Slide {currentSlide} / Story {storyId}
          </div>
          <div>
            Images={images.length} / Paragraph={paragraphs.length}
          </div>
          <div className="title">
            {title}
            <br />
            {description}
          </div>

          {!slideshowActive && (
            <>
              <ul className="paragraph-list">
                {paragraphs.map((para, idx) => (
                  <li key={idx} className="paragraph-item">
                    {truncateDescription(para, 8)}
                  </li>
                ))}
              </ul>
              {renderContent()}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Slide;
