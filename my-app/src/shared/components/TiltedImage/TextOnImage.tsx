import { useRef, useEffect, useState } from 'react';

interface TextOnImageProp {
  src:any;
  markerEntries?:any;
}

const TextOnImage = ({ src, markerEntries }:TextOnImageProp) => {
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = src;

    image.onload = () => {
      // Set canvas size to match the image size
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0);

      // Iterate over the text entries and draw each text
      markerEntries && markerEntries.forEach((entry,index) => {
        let title = entry.title;
        let coordX = Number(entry?.x);
        let coordY = Number(entry?.y);
        let reading = entry.data;
        let datetime = new Date(entry.datetime);
        datetime = `${datetime.getHours()}:${datetime.getMinutes()}`;
        if (coordX == null || coordY == null) return;
        // if (!title.includes("BF")) return;
        // ------------------
        ctx.font = '10px Tahoma';
        ctx.textAlign = 'center';
        const textWidth = ctx.measureText(title).width;
        const textHeight = 12; // Approximate height of the text
        // Draw black rectangle background
        ctx.fillStyle = entry.color;
        // console.log(datetime.hour.toString().padStart(2,'0'));
        // -----------
        ctx.fillRect(coordX - textWidth / 2 - 2, coordY - textHeight, textWidth + 4, textHeight + 26);
        // Draw blue text
        ctx.fillStyle = 'white';
        ctx.fillText(reading, coordX, coordY);
        ctx.fillText(title, coordX, coordY+10);
        ctx.fillText(datetime, coordX, coordY+20);
      });

      // Convert canvas to image
      setImageSrc(canvas.toDataURL());
    };
}, [src, markerEntries]);                         

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {imageSrc && <img src={imageSrc} alt="Text on Image" />}
    </div>
  );
};

export default TextOnImage;
