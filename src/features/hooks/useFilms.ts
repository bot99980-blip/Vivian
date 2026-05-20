// src/hooks/useFilms.ts
import { useState, useEffect } from "react";
import {
  getAllFilms,
  getFavoriteFilms,
  getFilmById,
} from "../services/filmService";
import type { FilmProps } from "../types/Films";

// Хук для получения всех фильмов
export const useFilms = () => {
  const [films, setFilms] = useState<FilmProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const data = await getAllFilms();
        setFilms(data);
      } catch (err) {
        setError("Ошибка при загрузке фильмов");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return { films, loading, error };
};

// Хук для получения избранных фильмов
export const useFavoriteFilms = () => {
  const [films, setFilms] = useState<FilmProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const data = await getFavoriteFilms();
        setFilms(data);
      } catch (err) {
        setError("Ошибка при загрузке избранных фильмов");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return { films, loading, error };
};

// Хук для получения одного фильма
export const useFilm = (id: string) => {
  const [film, setFilm] = useState<FilmProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        setLoading(true);
        const data = await getFilmById(id);
        setFilm(data);
      } catch (err) {
        setError("Ошибка при загрузке фильма");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFilm();
    }
  }, [id]);

  return { film, loading, error };
};
