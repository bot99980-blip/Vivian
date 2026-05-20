// pages/Individual.tsx
import { useParams, Link } from "react-router-dom";

import { useFilm } from "../features/hooks/useFilms";
import ReactPlayer from "react-player";
import "../styles/individual.scss";
import imdb from "../assets/imdb.png";
import kinopoisk from "../assets/unnamed.png";

export const Individual = () => {
  const { id } = useParams<{ id: string }>();
  const { film, loading, error } = useFilm(id || "");

  if (loading) return <main>Загрузка...</main>;
  if (error) return <main>{error}</main>;
  if (!film) return <main>Фильм не найден</main>;

  return (
    <main>
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
          url={film.youtubesourse}
          controls={true}
          light={film.img[0]}
        />
      </div>
    </main>
  );
};
