import { SHORT_FILM, MINUTES_IN_HOUR, NIL } from "../components/helpers/constants";

export function formatDuration(duration) {
    const hours = Math.trunc(duration / MINUTES_IN_HOUR);
    const minutes = duration % MINUTES_IN_HOUR;
  
    return `${hours > NIL ? `${hours}ч` : ''} ${minutes}м`;
  };

 export function findFilm(movies, word) {
  return movies
      .filter(movie => movie.nameRU.toLowerCase().includes(word.toLowerCase()) ?? movie.nameEN.toLowerCase().includes(word.toLowerCase()))
};

 export function filterFilmDuration(movies) {
   return movies.filter(movie => movie.duration <= SHORT_FILM);
 };
 