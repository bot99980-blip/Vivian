import type { FilmProps } from "../features/types/Films";
import { useParams, Link } from "react-router-dom";
import { Header } from "../components/Header";
import React from "react";
import ReactPlayer from "react-player";
import "../styles/individual.scss";

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
        <Link to="/">x</Link>
        <h1>{film.title}</h1>
        <img src={film.img[0]} alt={film.title} />
        <p>{film.undertitle}</p>
        <p>Кинопоиск: {film.kinopoisk}</p>
        <p>IMDb: {film.imdb}</p>
        <ReactPlayer
          src={film.youtubesourse}
          width="100%"
          height="100%"
          controls={true}
          light={film.img[0]}
        />
        <a href={film.youtubesourse}>Смотреть</a>
      </div>
    </main>
  );
};
