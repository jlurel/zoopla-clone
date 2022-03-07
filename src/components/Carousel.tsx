import { useState } from "react";
import { MdPhotoLibrary } from "react-icons/md";
import Slider from "react-slick";
import { Image } from "../types";

const Carousel = ({ slides }: { slides: Image[] }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setActiveSlide(current),
  };

  return (
    <div className="slider-wrapper flex flex-col relative mx-5 mb-6">
      <Slider {...settings} lazyLoad="progressive">
        {slides.map((slide, index) => (
          <div className="slick-slide" key={index}>
            <img
              className="slick-slide-image h-full max-h-[250px] md:max-h-[500px]"
              src={slide.original}
            />
          </div>
        ))}
      </Slider>
      <div className="inline-flex justify-around items-center w-20 my-0 mx-auto py-2 absolute bottom-6 left-0 right-0 rounded-md bg-white dark:bg-gray-800">
        <MdPhotoLibrary />
        <p>{`${activeSlide + 1}/${slides.length}`}</p>
      </div>
    </div>
  );
};

export default Carousel;
