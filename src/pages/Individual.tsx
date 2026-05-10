import type { FilmProps } from "../features/types/Films";
import { useParams, Link } from "react-router-dom";
import { Header } from "../components/Header";
import React from "react";
import ReactPlayer from "react-player";
import "../styles/individual.scss";
import imdb from "../assets/imdb.png";
import kinopoisk from "../assets/unnamed.png";
import Video from "../assets/2457193876021.mp4";

interface IndividualProps {
  films: FilmProps[];
}

export const Individual = ({ films }: IndividualProps) => {
  const { id } = useParams<{ id: string }>();

  const film = films.find((f) => f.id === Number(id));

  if (!film) {
    return <main>Фильм не найден</main>;
  }

  return (
    <main>
      <video loop autoPlay muted width="100%">
        <source src={Video} type="video/mp4" />
      </video>
      <Header />
      <div className="indiv">
        <div className="info">
          <div className="img">
            <img src={film.img[0]} alt={film.title} />
          </div>
          <div className="text">
            <h1>{film.title}</h1>
            <h2>{film.undertitle} 18+</h2>
            <div className="rates">
              <h3>
                <img className="rate" src={kinopoisk} alt="" /> {film.kinopoisk}
              </h3>
              <h3>
                <img className="rate" src={imdb} alt="" /> {film.imdb}
              </h3>
            </div>
            <h4>{film.desc}</h4>
          </div>
        </div>

        <ReactPlayer
          src={film.youtubesourse}
          controls={true}
          light={film.img[0]}
        />
      </div>
    </main>
  );
};
