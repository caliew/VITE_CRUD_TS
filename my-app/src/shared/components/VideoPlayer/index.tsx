import React from "react";

interface VideoProps {
  src: string;
  playing: boolean;
}

const VideoPlayer: React.FC<VideoProps> = ({ src, playing }) => {
  return (
    <video
      src={src}
      controls={playing}
      width="100%"
      height="100%"
      autoPlay={playing}
    />
  );
};

export default VideoPlayer;
