import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { FilmProps } from "../features/types/Films";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/home.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwiperProps {
  films: FilmProps[];
}

export const Swip: React.FC<SwiperProps> = ({ films }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrev = () => {
    swiperRef?.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.slideNext();
  };

  return (
    <div className="Swip">
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={40}
        grabCursor={true}
        onSwiper={setSwiperRef}
        onSlideChange={handleSlideChange}
        className="Swip__swiper"
      >
        {films.map((film, index) => (
          <SwiperSlide key={`${film.id}-${index}`} className="Swip__slide">
            <Link to={film.youtubesourse} className="Swip__card">
              <img className="Swip__card__img" src={film.img[0]} alt="" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
