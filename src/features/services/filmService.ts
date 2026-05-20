// src/services/filmService.ts
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/config";
import type { FilmProps } from "../types/Films";

const COLLECTION_NAME = "films";

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
  } catch (er) {
    console.log("Ошибка при получении фильмов:", er);
    throw er;
  }
};

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
  } catch (er) {
    console.log(er);
    throw er;
  }
};

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
  } catch (er) {
    console.log("Ошибка при получении избранных фильмов:", er);
    throw er;
  }
};
