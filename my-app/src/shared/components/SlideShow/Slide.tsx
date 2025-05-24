import React, { useState, useRef } from "react";
import EnlargedImagePopup from "./EnlargedImagePopup";

interface SlideProps {
  slideId: number;
  storyId: number;
  images: string[];
  title: string;
  content: string | string[];
  duration?: number;
  description: string;
  currentSlide: number;
  sourceName: string;
  port?: number;
}

const Slide: React.FC<SlideProps> = ({
  slideId,
  storyId,
  images,
  title,
  content,
  duration,
  description,
  currentSlide,
  sourceName,
  port = 8080,
}) => {
  const [showEnlargedImage, setShowEnlargedImage] = useState(false);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);

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

  const renderContent = () => {
    if (Array.isArray(content)) {
      return content.map((para, idx) => (
        <p key={idx} style={{ marginBottom: "1em" }}>
          {para}
        </p>
      ));
    }
    return <p>{content}</p>;
  };

  return (
    <section>
      <div className="source-name">{sourceName}</div>
      <div className="section">
        {images.map((image, idx) => {
          const isLarge = idx % 5 === 0;
          return (
            <img
              key={idx}
              className={`slide-image ${isLarge ? "large" : ""}`}
              src={`http://localhost:${port}/images/${image}`}
              alt={image}
              onClick={() => handleImageClick(idx)}
              style={{ cursor: "pointer" }}
            />
          );
        })}

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
          <div>
            Slide {slideId} / Story {storyId}
          </div>
          <div className="title">
            {title}
            <br />
            {description}
          </div>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Slide;
