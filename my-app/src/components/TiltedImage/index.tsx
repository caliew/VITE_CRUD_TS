import Tilt from 'react-parallax-tilt';
import TextOnImage from './TextOnImage';
import './index.css'; // Add some custom styles if needed
// import mreFloorPlan from '../../images/mre-coldroom-floorplan.png'; // Adjust the path based on your file location
import mreFloorPlan from '/assets/floorplan.png'; // Adjust the path based on your file location

interface TiltedImageProp {
  className?: string;
  markerEntries?: any;
  tiltX?: any;
  tiltY?: any
}

const TiltedImage = ({className,markerEntries,tiltX,tiltY}:TiltedImageProp) => {
  return (
    <Tilt
      className={`tilt ${className}`}
      tiltMaxAngleX={tiltX}
      tiltMaxAngleY={tiltY}
      perspective={1000}
      scale={1.2}
      transitionSpeed={1000}
    >
      <div className="tilt-inner">
        {/* <img src={myImage} alt="Tilted" /> */}
        <TextOnImage src={mreFloorPlan} markerEntries={markerEntries}  />
      </div>
    </Tilt>
  );
};

export default TiltedImage;
