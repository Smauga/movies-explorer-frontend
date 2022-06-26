import './SavedMovies.css';

import { useState } from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies({ savedMoviesList, onDeleteMovieClick, onSearchClick }) {

  const [searchMessage, setSearchMessage] = useState('Ничего не найдено');

  // Поиск сохраненных фильмов по введенному тексту
  function handleSearchMovies(search, shortFilms, isPageSavedMovies) {
    onSearchClick(search, shortFilms, isPageSavedMovies)
    .then(() => {setSearchMessage('Ничего не найдено')})
    .catch(() => {setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')});
  }

  return (
    <section className="saved-movies">
      <SearchForm onSearchClick={handleSearchMovies} isPageSavedMovies={true}/>
        {savedMoviesList.length === 0 ?
        <p className='saved-movies__not-found'>{searchMessage}</p> :
        <MoviesCardList saved={true}>
          {savedMoviesList.map((savedMovie) =>
            <MoviesCard movie={savedMovie}
              key={savedMovie.movieId}
              onDeleteMovieClick={onDeleteMovieClick}
              isPageSavedMovies={true}
              movieIsSaved={true}/> 
            )
          }
        </MoviesCardList>}
    </section>
  );
}

export default SavedMovies;