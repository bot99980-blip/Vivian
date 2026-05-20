# Интеграция с OMDB API

Этот проект теперь поддерживает интеграцию с [OMDB API](http://www.omdbapi.com/) для получения информации о фильмах.

## Настройка

### 1. Получение API ключа

1. Перейдите на сайт [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Заполните форму для получения бесплатного API ключа
3. Скопируйте полученный ключ

### 2. Установка API ключа

Откройте файл `src/services/omdbApi.ts` и замените `YOUR_OMDB_API_KEY` на ваш ключ:

```typescript
const API_KEY = 'ваш_ключ_здесь';
```

## Доступные функции

### Поиск фильмов

```typescript
import { searchFilms } from './services/omdbApi';

const results = await searchFilms('Matrix');
```

### Получение информации о фильме по IMDb ID

```typescript
import { getFilmById } from './services/omdbApi';

const film = await getFilmById('tt0133093');
```

### Получение информации о фильме по названию

```typescript
import { getFilmByTitle } from './services/omdbApi';

const film = await getFilmByTitle('The Matrix', '1999');
```

## Использование хука

Для загрузки данных о фильме в React-компонентах используйте хук `useOmdbFilm`:

```typescript
import { useOmdbFilm } from './hooks/useOmdbFilm';

function FilmComponent() {
  const { film, loading, error } = useOmdbFilm({ 
    title: 'The Matrix', 
    year: '1999' 
  });

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!film) return null;

  return (
    <div>
      <h1>{film.title}</h1>
      <img src={film.img[0]} alt={film.title} />
      <p>{film.desc}</p>
    </div>
  );
}
```

## Компонент поиска

Используйте компонент `SearchResults` для добавления поиска фильмов:

```typescript
import { SearchResults } from './components/SearchResults';

function App() {
  const handleFilmSelect = (film) => {
    // Обработка выбранного фильма
    console.log(film);
  };

  return <SearchResults onFilmSelect={handleFilmSelect} />;
}
```

## Структура данных

Данные из OMDB API преобразуются в формат `FilmProps`:

```typescript
interface FilmProps {
  id: number | string;
  title: string;
  img: string[];
  undertitle: string;
  kinopoisk: number;
  imdb: number;
  youtubesourse: string;
  fav: boolean;
  desc: string;
  imdbID?: string;
  year?: string;
}
```

## Ограничения бесплатного тарифа

- 1000 запросов в день
- Краткое описание сюжета (plot=short)
- Для полного описания нужен платный тариф

## Ссылки

- [OMDB API Documentation](https://www.omdbapi.com/)
- [Получить API ключ](https://www.omdbapi.com/apikey.aspx)
