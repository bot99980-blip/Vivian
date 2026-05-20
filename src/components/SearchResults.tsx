import { useState } from 'react';
import type { FilmProps } from '../features/types/Films';
import { searchFilms, type OmdbFilm } from '../services/omdbApi';
import '../styles/search.scss';

interface SearchResultsProps {
  onFilmSelect: (film: FilmProps) => void;
}

export const SearchResults = ({ onFilmSelect }: SearchResultsProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<OmdbFilm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchFilms(query);
      
      if (data.Response === 'True' && data.Search) {
        // Для каждого результата получаем подробную информацию
        const detailedFilms = await Promise.all(
          data.Search.map(async (film) => {
            try {
              const url = `https://www.omdbapi.com/?i=${film.imdbID}&plot=short&apikey=YOUR_OMDB_API_KEY`;
              const response = await fetch(url);
              return await response.json();
            } catch {
              return null;
            }
          })
        );
        
        setResults(detailedFilms.filter((f): f is OmdbFilm => f !== null && f.Response === 'True'));
      } else {
        setResults([]);
        setError('Ничего не найдено');
      }
    } catch {
      setError('Ошибка при поиске');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilmClick = (omdbFilm: OmdbFilm) => {
    // Преобразуем данные OMDB в формат FilmProps
    let kinopoisk = 0;
    let imdb = 0;
    
    if (omdbFilm.Ratings) {
      omdbFilm.Ratings.forEach(rating => {
        if (rating.Source === 'Internet Movie Database') {
          imdb = parseFloat(rating.Value.replace('/10', ''));
        }
      });
    }

    const film: FilmProps = {
      id: omdbFilm.imdbID,
      title: `${omdbFilm.Title} ${omdbFilm.Year}`,
      undertitle: omdbFilm.Title,
      img: [omdbFilm.Poster !== 'N/A' ? omdbFilm.Poster : ''],
      kinopoisk,
      imdb,
      youtubesourse: '',
      fav: false,
      desc: omdbFilm.Plot || '',
      imdbID: omdbFilm.imdbID,
      year: omdbFilm.Year,
    };

    onFilmSelect(film);
  };

  return (
    <div className="search-results">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск фильмов..."
          className="search-input"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Загрузка...' : 'Найти'}
        </button>
      </form>

      {error && <p className="search-error">{error}</p>}

      {results.length > 0 && (
        <div className="search-list">
          {results.map((film) => (
            <div
              key={film.imdbID}
              className="search-item"
              onClick={() => handleFilmClick(film)}
            >
              {film.Poster !== 'N/A' && (
                <img src={film.Poster} alt={film.Title} />
              )}
              <div className="search-item-info">
                <h3>{film.Title}</h3>
                <p>{film.Year}</p>
                {film.Plot && <p className="search-plot">{film.Plot.substring(0, 100)}...</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
