import type { FilmProps } from "../features/types/Films";
import { useParams, Link } from "react-router-dom";
import { Header } from "../components/Header";
import React from "react";
import ReactPlayer from "react-player";
import "../styles/individual.scss";
import imdb from "../assets/imdb.png";

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
      <Header />
      <div className="indiv">
        <div className="info">
          <div className="img">
            <img src={film.img[0]} alt={film.title} />
          </div>
          <div className="text">
            <h1>{film.title}</h1>
            <p>{film.undertitle} 18+</p>
            <p>Кинопоиск: {film.kinopoisk}</p>
            <p>
              <img className="rate" src={imdb} alt="" /> {film.imdb}
            </p>
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
