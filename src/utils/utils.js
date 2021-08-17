import { SHORT_FILM } from "../components/helpers/constants";

export function formatDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
  
    return `${hours > 0 ? `${hours}ч` : ''} ${minutes}м`;
  };

 export function searchFilm(movies, word) {
   return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(word);
   });
 };

 export function filterDuration(movies) {
   return movies.filter((movie) => movie.duration < SHORT_FILM);
 };