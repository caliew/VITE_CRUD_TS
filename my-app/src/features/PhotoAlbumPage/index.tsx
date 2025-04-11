import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@shared/components/Button";
import { GetIcon } from "@utils/icon";
import { ButtonLINKClasses } from "@shared/utils/classname";
import Slider from "react-slick";

interface Slide {
  image: string;
  text: string;
}

const PhotoAlbumPage = () => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    fetch("slides.json")
      .then((response) => response.json())
      .then((data) => setSlides(data));
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageData = reader.result;
        setImgSrc(imageData);
      });
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-4/5 h-4/5 flex flex-row justify-center items-center">
        <img
          src={slides[currentSlide]?.image}
          alt="Slide image"
          className="w-full h-full object-fit object-position-center"
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
        {!!imgSrc && (
          <img
            ref={imgRef}
            src={imgSrc}
            alt="Selected image"
            className="w-full h-full object-fit object-position-center"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        )}
        <div className="text-lg font-bold mt-4">
          {slides[currentSlide]?.text}
        </div>
      </div>
      <input type="file" onChange={onSelectFile} />
      <div className="flex justify-between mt-4">
        <Button
          Icon={GetIcon("previous")}
          className={ButtonLINKClasses}
          onClick={handlePrevSlide}
        >
          PREV
        </Button>
        <Button
          Icon={GetIcon("next")}
          className={ButtonLINKClasses}
          onClick={handleNextSlide}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default PhotoAlbumPage;
