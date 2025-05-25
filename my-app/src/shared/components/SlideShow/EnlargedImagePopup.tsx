import React from "react";
import ReactDOM from "react-dom";

interface EnlargedImagePopupProps {
  images: string[];
  enlargedImageIndex: number;
  port: number;
  onClose: () => void;
  onRewind: () => void;
  onForward: () => void;
  onSnapshot: () => void;
}

const EnlargedImagePopup: React.FC<EnlargedImagePopupProps> = ({
  images,
  enlargedImageIndex,
  port,
  onClose,
  onRewind,
  onForward,
  onSnapshot,
}) => {
  const enlargedImage = images[enlargedImageIndex];
  const popupRoot = document.getElementById("popup-root");
  if (!popupRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="enlarged-popup-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="enlarged-popup-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90%",
          maxHeight: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={`http://localhost:${port}/images/${enlargedImage}`}
          alt="Enlarged"
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
          }}
        />

        <div
          className="popup-controls"
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button onClick={onRewind} title="Previous" style={buttonStyle}>
            &#9664;
          </button>
          <button onClick={onSnapshot} title="Download" style={buttonStyle}>
            ⬇
          </button>
          <button onClick={onForward} title="Next" style={buttonStyle}>
            &#9654;
          </button>
          <button
            onClick={onClose}
            title="Close"
            style={{ ...buttonStyle, color: "red" }}
          >
            ×
          </button>
        </div>
      </div>
    </div>,
    popupRoot
  );
};

const buttonStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid #fff",
  borderRadius: "4px",
  padding: "0.5em 1em",
  color: "#fff",
  fontSize: "1.2em",
  cursor: "pointer",
  backdropFilter: "blur(4px)",
};

export default EnlargedImagePopup;
