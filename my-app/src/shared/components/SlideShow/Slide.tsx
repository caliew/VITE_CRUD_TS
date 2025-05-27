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
  duration?: number;
  port?: number;
  editable?: boolean;
  modeVideo?: "PLAY" | "PAUSE";
  updateStoryData?: (data: {
    id: number;
    title: string;
    content: string;
    duration?: number;
    description: string;
    paragraph: string[];
  }) => Promise<boolean>;
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
  duration = 10,
  port = 8080,
  editable = true,
  modeVideo,
  updateStoryData,
}) => {
  const [showEnlargedImage, setShowEnlargedImage] = useState(false);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState(0);
  const [slideshowActive, setSlideshowActive] = useState(true);
  const [slideshowImageIndex, setSlideshowImageIndex] = useState(0);
  const [slideshowParagraphIndex, setSlideshowParagraphIndex] = useState(0);

  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(paragraphs.join("\n"));

  const [localParagraphs, setLocalParagraphs] = useState<string[]>([
    ...paragraphs,
  ]);

  const imageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const paragraphTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalParagraphs([...paragraphs]);
    setEditedText(paragraphs.join("\n"));
  }, [paragraphs]);

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
    const paragraphCount = localParagraphs.length;
    const MIN_IMAGE_INTERVAL = 300;
    const MIN_PARAGRAPH_INTERVAL = 500;

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

  const slideShowControl = () => (
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

  const SourceName = () => (
    <div className="source-name">{sourceName.split("_")[0]}</div>
  );

  const handleSave = () => {
    const lines = editedText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    if (lines.length > 0) {
      setLocalParagraphs(lines);
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditedText(localParagraphs.join("\n"));
    setEditMode(false);
  };

  const handleUpload = async () => {
    if (updateStoryData) {
      const success = await updateStoryData({
        id: storyId,
        title,
        content,
        duration,
        description,
        paragraph: localParagraphs,
      });

      if (success) {
        alert("Paragraphs uploaded successfully.");
      } else {
        alert("Upload failed.");
      }
    }
  };

  const EditParagraphFunction = () => {
    return (
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSave} className="slideshow-btn">
          Save
        </button>
        <button
          onClick={handleCancel}
          className="slideshow-btn"
          style={{ marginLeft: 10 }}
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          className="slideshow-btn"
          style={{ marginLeft: 10 }}
        >
          Upload
        </button>
      </div>
    );
  };

  return (
    <section data-transition="fade">
      <div className="section">
        {slideshowActive && images.length > 0 ? (
          <div className="image-text-overlay-wrapper">
            <img
              className="slide-image large overlay-image"
              src={`http://localhost:${port}/images/${images[slideshowImageIndex]}`}
              alt={`slideshow-${slideshowImageIndex}`}
            />
            {localParagraphs.length > 0 && (
              <p className="overlay-text">
                {localParagraphs[slideshowParagraphIndex]}
              </p>
            )}

            {slideshowActive && (
              <div style={{ marginTop: 10, textAlign: "center" }}>
                {!editMode && editable ? (
                  <button
                    onClick={() => {
                      setEditedText(localParagraphs.join("\n"));
                      setEditMode(true);
                    }}
                    className="slideshow-btn"
                  >
                    Edit Paragraph
                  </button>
                ) : (
                  editMode && (
                    <div style={{ padding: "10px" }}>
                      <textarea
                        className="edit-textarea"
                        placeholder="Enter text here..."
                        value={editedText || ""}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows={3}
                      />
                      {EditParagraphFunction()}
                    </div>
                  )
                )}
              </div>
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
          className={`text-overlay ${
            currentSlide === slideId ? "visible" : ""
          }`}
          data-fragment-index={2}
        >
          {SourceName()}
          {slideShowControl()}
          <div>
            Slide {currentSlide} / Story {storyId}
          </div>
          <div>
            Images={images.length} / Paragraph={localParagraphs.length}
          </div>
          <div className="title">
            {title}
            <br />
            {description}
          </div>

          <>
            <ul className="paragraph-list">
              {localParagraphs.map((para, idx) => (
                <li
                  key={idx}
                  className={`paragraph-item ${
                    slideshowActive && idx === slideshowParagraphIndex
                      ? "highlight"
                      : ""
                  }`}
                >
                  {slideshowActive && idx === slideshowParagraphIndex
                    ? para
                    : truncateDescription(para, 8)}
                </li>
              ))}
            </ul>
            {renderContent()}
          </>
        </div>
      </div>
    </section>
  );
};

export default Slide;
