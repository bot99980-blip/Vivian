import { useState, useEffect } from "react";
import {
  getAllFilms,
  getFavoriteFilms,
  getFilmById,
} from "../services/filmService";
import type { FilmProps } from "../types/Films";

export const useFilms = () => {
  const [films, setFilms] = useState<FilmProps[]>([]);
  const [load, setload] = useState(true);
  const [err, seterr] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setload(true);
        const data = await getAllFilms();
        setFilms(data);
      } catch (err) {
        seterr("useFilms");
        console.log(err);
      } finally {
        setload(false);
      }
    };

    fetchFilms();
  }, []);

  return { films, load, err };
};

export const useFavoriteFilms = () => {
  const [films, setFilms] = useState<FilmProps[]>([]);
  const [load, setload] = useState(true);
  const [err, seterr] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setload(true);
        const data = await getFavoriteFilms();
        setFilms(data);
      } catch (err) {
        seterr("useFavoriteFilms");
        console.log(err);
      } finally {
        setload(false);
      }
    };

    fetchFilms();
  }, []);

  return { films, load, err };
};

export const useFilm = (id: string) => {
  const [film, setFilm] = useState<FilmProps | null>(null);
  const [load, setload] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        setload(true);
        const data = await getFilmById(id);
        setFilm(data);
      } catch (err) {
        setErr("useFilm");
        console.log(err);
      } finally {
        setload(false);
      }
    };

    if (id) {
      fetchFilm();
    }
  }, [id]);

  return { film, load, err };
};
