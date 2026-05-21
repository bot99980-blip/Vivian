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

export const getAllFilms = async (): Promise<FilmProps[]> => {
  try {
    const snap = await getDocs(collection(db, "films"));
    const films: FilmProps[] = [];

    snap.forEach((doc) => {
      films.push({
        firebaseId: doc.id,
        ...doc.data(),
      } as FilmProps);
    });

    return films;
  } catch (er) {
    console.log(er);
    throw er;
  }
};

export const getFilmById = async (id: string): Promise<FilmProps | null> => {
  try {
    const docref = doc(db, "films", id);
    const docsnap = await getDoc(docref);

    if (docsnap.exists()) {
      return {
        firebaseId: docsnap.id,
        ...docsnap.data(),
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
    const q = query(collection(db, "films"), where("fav", "==", true));

    const snap = await getDocs(q);
    const films: FilmProps[] = [];

    snap.forEach((doc) => {
      films.push({
        firebaseId: doc.id,
        ...doc.data(),
      } as FilmProps);
    });

    return films;
  } catch (er) {
    console.log(er);
    throw er;
  }
};
