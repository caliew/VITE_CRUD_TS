import React from "react";
import { Button } from "@shared/components";
import { ButtonLINKClasses } from "@shared/utils/classname";
import { GetIcon } from "@shared/utils/icon";

const NavigationBar = ({
  currentSlide,
  slidesLength,
  modeVideo,
  VideoMode,
  remainingTime, // new prop
  onHome,
  onReload,
  onFirst,
  onLast,
  onPrevious,
  onTogglePlay,
  onNext,
}) => {
  return (
    <div className="controls font-Roboto text-lg text-white font-extralight flex justify-center items-center mt-4 gap-4">
      <Button
        Icon={GetIcon("home")}
        className={ButtonLINKClasses}
        to="/"
        onClick={onHome}
      >
        HOME
      </Button>
      <Button className={ButtonLINKClasses} onClick={onReload}>
        RELOAD
      </Button>
      <Button className={ButtonLINKClasses} onClick={onFirst}>
        FIRST
      </Button>
      <Button className={ButtonLINKClasses} onClick={onLast}>
        LAST
      </Button>
      <Button className={ButtonLINKClasses} onClick={onPrevious}>
        PREVIOUS {currentSlide - 1 < 0 ? slidesLength - 1 : currentSlide - 1}
      </Button>
      <Button
        Icon={GetIcon(
          modeVideo === VideoMode.PLAY ? "VideoPause" : "VideoPlay"
        )}
        className={ButtonLINKClasses}
        iconClassName="size-10 text-red-500"
        onClick={onTogglePlay}
      >
        {/* Show countdown timer here */}
        {modeVideo === VideoMode.PLAY && remainingTime !== null ? (
          <span className="mx-2">[{remainingTime}]</span>
        ) : (
          <span className="mx-2">[--]</span>
        )}
        {currentSlide}/{slidesLength - 1}
      </Button>
      <Button className={ButtonLINKClasses} onClick={onNext}>
        NEXT {currentSlide >= slidesLength - 1 ? 0 : currentSlide + 1}
      </Button>
    </div>
  );
};

export default NavigationBar;
