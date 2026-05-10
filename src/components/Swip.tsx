import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { FilmProps } from "../features/types/Films";
import { Link } from "react-router-dom";

import "../styles/home.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwiperProps {
  films: FilmProps[];
}

export const Swip = ({ films }: SwiperProps) => {
  return (
    <div className="Swip">
      <Swiper
        modules={[Navigation, Autoplay]} // Добавить Autoplay
        slidesPerView="auto"
        spaceBetween={40}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={11000}
        className="Swip__swiper"
      >
        {films.map((film, index) => (
          <SwiperSlide key={`${film.id}-${index}`} className="Swip__slide">
            <Link to={`/film/${film.id}`} className="Swip__card">
              <img className="Swip__card__img" src={film.img[0]} alt="" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
