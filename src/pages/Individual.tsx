import { useParams } from "react-router-dom";
import { Load } from "../components/Load";
import { useFilm } from "../features/hooks/useFilms";
import ReactPlayer from "react-player";
import "../styles/individual.scss";
import imdb from "../assets/imdb.png";
import kinopoisk from "../assets/unnamed.png";

export const Individual = () => {
  const { id } = useParams<{ id: string }>();
  const { film, load, err } = useFilm(id || "");

  if (load)
    return (
      <main>
        <Load />
      </main>
    );
  if (err) return <main>{err}</main>;
  if (!film) return <main>Фильм не найден</main>;

  return (
    <main>
      <div className="indiv">
        <div className="indiv__info">
          <div className="indiv__info__img">
            <img src={film.img[0]} alt={film.title} />
          </div>
          <div className="indiv__info__text">
            <h1>{film.title}</h1>
            <h2>{film.undertitle} 18+</h2>
            <div className="indiv__info__text__rates">
              <h3>
                <img
                  className="indiv__info__text__rates__rate"
                  src={kinopoisk}
                  alt=""
                />{" "}
                {film.kinopoisk}
              </h3>
              <h3>
                <img
                  className="indiv__info__text__rates__rate"
                  src={imdb}
                  alt=""
                />{" "}
                {film.imdb}
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
