import { useState, useEffect } from 'react';
import type { FilmProps } from '../features/types/Films';
import { fetchFilmFromOmdb } from '../data/Films';

interface UseOmdbFilmProps {
  title: string;
  year?: string;
}

/**
 * Хук для загрузки данных о фильме из OMDB API
 */
export const useOmdbFilm = ({ title, year }: UseOmdbFilmProps) => {
  const [film, setFilm] = useState<FilmProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFilm = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchFilmFromOmdb(title, year);
        if (data) {
          setFilm(data);
        } else {
          setError('Фильм не найден');
        }
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      loadFilm();
    }
  }, [title, year]);

  return { film, loading, error };
};
