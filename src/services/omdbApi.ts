// OMDB API Service
const API_KEY = 'YOUR_OMDB_API_KEY'; // Замените на ваш API ключ от omdbapi.com
const BASE_URL = 'https://www.omdbapi.com/';

// Проверка, установлен ли API ключ
const checkApiKey = () => {
  if (API_KEY === 'YOUR_OMDB_API_KEY') {
    console.warn('OMDB API key не установлен! Пожалуйста, получите бесплатный ключ на http://www.omdbapi.com/apikey.aspx и замените YOUR_OMDB_API_KEY в файле src/services/omdbApi.ts');
    return false;
  }
  return true;
};

export interface OmdbFilm {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Ratings?: Array<{
    Source: string;
    Value: string;
  }>;
  Director?: string;
  Actors?: string;
  Genre?: string;
  Runtime?: string;
  Language?: string;
  Country?: string;
}

export interface SearchResponse {
  Search: Array<{
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }>;
  totalResults: string;
  Response: string;
}

/**
 * Поиск фильмов по названию
 */
export const searchFilms = async (query: string): Promise<SearchResponse> => {
  if (!checkApiKey()) {
    throw new Error('API ключ не установлен');
  }
  
  const url = `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Ошибка при поиске фильмов');
  }
  
  return await response.json();
};

/**
 * Получение подробной информации о фильме по IMDb ID
 */
export const getFilmById = async (imdbId: string): Promise<OmdbFilm> => {
  if (!checkApiKey()) {
    throw new Error('API ключ не установлен');
  }
  
  const url = `${BASE_URL}?i=${imdbId}&plot=short&apikey=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Ошибка при получении данных о фильме');
  }
  
  const data = await response.json();
  
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Фильм не найден');
  }
  
  return data;
};

/**
 * Получение подробной информации о фильме по названию и году
 */
export const getFilmByTitle = async (title: string, year?: string): Promise<OmdbFilm> => {
  if (!checkApiKey()) {
    throw new Error('API ключ не установлен');
  }
  
  let url = `${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`;
  
  if (year) {
    url += `&y=${year}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Ошибка при получении данных о фильме');
  }
  
  const data = await response.json();
  
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Фильм не найден');
  }
  
  return data;
};
