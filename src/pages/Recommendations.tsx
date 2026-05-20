import { Link } from "react-router-dom";
import { useFavoriteFilms } from "../features/hooks/useFilms";
import "../styles/recommendations.scss";

export const Recommendations = () => {
  const { films, loading, error } = useFavoriteFilms();

  if (loading) return <main>Загрузка...</main>;
  if (error) return <main>{error}</main>;

  return (
    <main>
      <div className="recs">
        <div className="recs__title">
          <h1>РЕКОМЕНДАЦИИ</h1>
          <p>Фильмы, которые стоит посмотреть</p>
        </div>
        <div className="recs__grid">
          {films.map((film) => (
            <Link
              to={`/film/${film.firebaseId}`}
              key={film.firebaseId}
              className="recs__card"
            >
              <div className="recs__card-img">
                <img src={film.img[0]} alt={film.title} />
              </div>
              <div className="recs__card-info">
                <h2>{film.title}</h2>
                <h3>{film.undertitle}</h3>
                <p>{film.desc}</p>
                <div className="recs__card-rates">
                  <span>Кинопоиск: {film.kinopoisk}</span>
                  <span>IMDb: {film.imdb}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
