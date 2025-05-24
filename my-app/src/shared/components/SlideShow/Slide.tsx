import React, { useState } from "react";

const Slide = ({
  slideId,
  storyId,
  images,
  title,
  content,
  description,
  currentSlide,
  sourceName,
  port = 8080,
}) => {
  const [showEnlargedImage, setShowEnlargedImage] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleImageClick = (image) => {
    setEnlargedImage(image);
    setShowEnlargedImage(true);
  };

  const handleClose = () => setShowEnlargedImage(false);

  return (
    <section>
      <div className="source-name">{sourceName}</div>
      <div className="section">
        {images.map((image, idx) => (
          <img
            key={idx}
            className={`slide-image-${images.length}`}
            src={`http://localhost:${port}/images/${image}`}
            alt={image}
            onClick={() => handleImageClick(image)}
            style={{ cursor: "pointer" }}
          />
        ))}

        {showEnlargedImage && (
          <div className="enlarged-image-popup" onClick={handleClose}>
            <img
              src={`http://localhost:${port}/images/${enlargedImage}`}
              alt="Enlarged"
            />
          </div>
        )}

        <div
          className={`text-overlay fragment ${
            currentSlide === slideId ? "visible" : ""
          }`}
          data-fragment-index="2"
        >
          <div>
            Slide {slideId} / Story {storyId}
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

export default Slide;
