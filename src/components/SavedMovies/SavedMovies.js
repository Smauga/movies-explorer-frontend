import './SavedMovies.css';

import { useState } from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import { notFoundMoviesMessage, notFoundMoviesErrorMessage } from '../../utils/constants';


function SavedMovies({ filtredSavedMoviesList, onDeleteMovieClick, onSearchClick }) {

  const [searchMessage, setSearchMessage] = useState(notFoundMoviesMessage);

  // Поиск сохраненных фильмов по введенному тексту
  function handleSearchMovies(enteredSearchText, shortMoviesCheckbox, isPageSavedMovies) {
    onSearchClick(enteredSearchText, shortMoviesCheckbox, isPageSavedMovies)
    .then(() => {setSearchMessage(notFoundMoviesMessage)})
    .catch(() => {setSearchMessage(notFoundMoviesErrorMessage)});
  }

  return (
    <section className="saved-movies">
      <SearchForm onSearchClick={handleSearchMovies} isPageSavedMovies={true}/>
        {filtredSavedMoviesList.length === 0 ?
        <p className='saved-movies__not-found'>{searchMessage}</p> :
        <MoviesCardList>
          {filtredSavedMoviesList.map((savedMovie) =>
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