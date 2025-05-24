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

  const popupContent = (
    <div className="enlarged-image-popup" onClick={onClose}>
      <img
        src={`http://localhost:${port}/images/${enlargedImage}`}
        alt="Enlarged"
        onClick={(e) => e.stopPropagation()}
      />
      <div
        className="enlarged-image-controls"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onRewind} title="Rewind">
          &#9664;
        </button>
        <button
          onClick={onClose}
          title="Close"
          className="close-control-button"
        >
          ×
        </button>
        <button onClick={onForward} title="Forward">
          &#9654;
        </button>
        <button onClick={onSnapshot} title="Snapshot">
          Snapshot
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    popupContent,
    document.getElementById("popup-root")!
  );
};

export default EnlargedImagePopup;
