
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { films } from "../data/Films";
import "../styles/recommendations.scss";
import Video from "../assets/2457193876021.mp4";
import imdb from "../assets/imdb.png";
import kinopoisk from "../assets/unnamed.png";
import { use, useState } from "react";

export const Recommendations = () => {
  const favFilms = films.filter((film) => film.fav === true);

  return (
    <main>
      <Header />
      <div className="recs">
        <div className="recs__title">
          <h1>РЕКОМЕНДАЦИИ</h1>
          <p>Фильмы, которые стоит посмотреть</p>
        </div>
        <div className="recs__grid">
          {favFilms.map((film) => (
            <Link to={`/film/${film.id}`} key={film.id} className="recs__card">
              <div className="recs__card-img">
                <img src={film.img[0]} alt={film.title} />
              </div>
              <div className="recs__card-info">
                <h2>{film.title}</h2>
                <h3>{film.undertitle}</h3>
                <p>{film.desc}</p>
                <div className="recs__card-rates">
                  <span>
                    <img className="rate" src={kinopoisk} alt="" />{" "}
                    {film.kinopoisk}
                  </span>
                  <span>
                    <img className="rate" src={imdb} alt="" /> {film.imdb}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
