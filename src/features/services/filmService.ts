// src/services/filmService.ts
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../services/config";
import type { FilmProps } from "../types/Films";

const COLLECTION_NAME = "films";

// Получить все фильмы
export const getAllFilms = async (): Promise<FilmProps[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const films: FilmProps[] = [];

    querySnapshot.forEach((doc) => {
      films.push({
        firebaseId: doc.id,
        ...doc.data(),
      } as FilmProps);
    });

    return films;
  } catch (error) {
    console.error("Ошибка при получении фильмов:", error);
    throw error;
  }
};

// Получить фильм по ID
export const getFilmById = async (id: string): Promise<FilmProps | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        firebaseId: docSnap.id,
        ...docSnap.data(),
      } as FilmProps;
    }

    return null;
  } catch (error) {
    console.error("Ошибка при получении фильма:", error);
    throw error;
  }
};

// Получить избранные фильмы
export const getFavoriteFilms = async (): Promise<FilmProps[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where("fav", "==", true));

    const querySnapshot = await getDocs(q);
    const films: FilmProps[] = [];

    querySnapshot.forEach((doc) => {
      films.push({
        firebaseId: doc.id,
        ...doc.data(),
      } as FilmProps);
    });

    return films;
  } catch (error) {
    console.error("Ошибка при получении избранных фильмов:", error);
    throw error;
  }
};

// Добавить фильм
export const addFilm = async (
  film: Omit<FilmProps, "firebaseId">,
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), film);
    return docRef.id;
  } catch (error) {
    console.error("Ошибка при добавлении фильма:", error);
    throw error;
  }
};

// Обновить фильм
export const updateFilm = async (
  id: string,
  film: Partial<FilmProps>,
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, film);
  } catch (error) {
    console.error("Ошибка при обновлении фильма:", error);
    throw error;
  }
};

// Удалить фильм
export const deleteFilm = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Ошибка при удалении фильма:", error);
    throw error;
  }
};

// Массовое добавление фильмов (для начальной загрузки)
export const seedFilms = async (
  films: Omit<FilmProps, "firebaseId">[],
): Promise<void> => {
  try {
    const promises = films.map((film) => addFilm(film));
    await Promise.all(promises);
    console.log("Фильмы успешно добавлены");
  } catch (error) {
    console.error("Ошибка при массовом добавлении фильмов:", error);
    throw error;
  }
};
