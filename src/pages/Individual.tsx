import type { FilmProps } from "../features/types/Films";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import ReactPlayer from "react-player";
import "../styles/individual.scss";
import imdb from "../assets/imdb.png";
import kinopoisk from "../assets/unnamed.png";

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
                  className="indiv__info__rates__rate"
                  src={kinopoisk}
                  alt=""
                />{" "}
                {film.kinopoisk}
              </h3>
              <h3>
                <img className="indiv__info__rates__rate" src={imdb} alt="" />{" "}
                {film.imdb}
              </h3>
            </div>
            <h4>{film.desc}</h4>
            <ReactPlayer
              src={film.youtubesourse}
              controls={true}
              light={film.img[0]}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
