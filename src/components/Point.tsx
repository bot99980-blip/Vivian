import { useState } from "react";
import { Link } from "react-router-dom";
import { Paragh } from "../components/Paragh";
import { useFilms } from "../features/hooks/useFilms";
import "../styles/point.scss";
import imdb from "../assets/imdb.png";
import kinopoisk from "../assets/unnamed.png";

export const Point = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { films, loading, error } = useFilms();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (films.length === 0) return <div>Нет фильмов</div>;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % films.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + films.length) % films.length);
  };

  const film = films[currentIndex];

  return (
    <>
      <Paragh title="ТОЧКА ИНТЕРЕСА" />
      <div className="point">
        <div className="point__container">
          <Link to={`/film/${film.firebaseId}`} className="point__poster">
            <img src={film.img[0]} alt={film.title} />
          </Link>

          <div className="point__info">
            <Link to={`/film/${film.firebaseId}`} className="point__title-link">
              <h1 className="point__title">{film.title}</h1>
            </Link>

            <h2 className="point__undertitle">{film.undertitle}</h2>

            <div className="point__rates">
              <div className="point__rate">
                <img src={kinopoisk} alt="Кинопоиск" />
                <span>{film.kinopoisk}</span>
              </div>
              <div className="point__rate">
                <img src={imdb} alt="IMDb" />
                <span>{film.imdb}</span>
              </div>
            </div>

            <p className="point__desc">{film.desc}</p>

            <Link to={`/film/${film.firebaseId}`} className="point__watch-btn">
              Смотреть фильм
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <div className="point__controls">
              <button
                className="point__btn point__btn--prev"
                onClick={handlePrev}
                aria-label="Предыдущий фильм"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="point__counter">
                {currentIndex + 1} / {films.length}
              </div>

              <button
                className="point__btn point__btn--next"
                onClick={handleNext}
                aria-label="Следующий фильм"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="point__dots">
          {films.map((_, index) => (
            <button
              key={index}
              className={`point__dot ${index === currentIndex ? "point__dot--active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Перейти к фильму ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};
