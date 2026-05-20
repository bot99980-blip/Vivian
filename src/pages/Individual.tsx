import type { FilmProps } from "../features/types/Films";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import ReactPlayer from "react-player";
import "../styles/individual.scss";
import imdb from "../assets/imdb.png";
import kinopoisk from "../assets/unnamed.png";
import { useOmdbFilm } from "../hooks/useOmdbFilm";

interface IndividualProps {
  films: FilmProps[];
}

export const Individual = ({ films }: IndividualProps) => {
  const { id } = useParams<{ id: string }>();

  // Пытаемся найти фильм в локальном массиве
  const localFilm = films.find((f) => f.id === Number(id));
  
  // Если фильм найден локально, используем его данные для поиска в OMDB
  const { film: omdbFilm, loading, error } = useOmdbFilm({ 
    title: localFilm?.undertitle || '', 
    year: localFilm?.year 
  });

  // Приоритет: OMDB данные > локальные данные
  const film = omdbFilm || localFilm;

  if (!film) {
    return <main>Фильм не найден</main>;
  }

  if (loading) {
    return <main>Загрузка...</main>;
  }

  if (error) {
    console.warn('OMDB ошибка:', error);
    // Продолжаем с локальными данными если есть
    if (!localFilm) {
      return <main>{error}</main>;
    }
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
