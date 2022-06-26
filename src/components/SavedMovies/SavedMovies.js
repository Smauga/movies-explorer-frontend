import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from 'react';
function SavedMovies({ savedMovies, handleDelete, searchMovies }) {

  const [searchMessage, setSearchMessage] = useState('Ничего не найдено');

  function handleSearchMovies(search, shortFilms, savedSection) {
    searchMovies(search, shortFilms, savedSection)
    .then(() => {setSearchMessage('Ничего не найдено')})
    .catch(() => {setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')});
  }

  return (
    <section className="saved-movies">
      <SearchForm onSearchClick={handleSearchMovies} savedSection={true}/>
        {savedMovies.length === 0 ?
        <p className='saved-movies__not-found'>{searchMessage}</p> :
        <MoviesCardList saved={true}>
          {savedMovies.map((savedMovie) =>
            <MoviesCard movie={savedMovie}
              key={savedMovie.movieId}
              handleDelete={handleDelete}
              savedSection={true}
              movieIsSaved={true}/> 
            )
          }
        </MoviesCardList>}
    </section>
  );
}

export default SavedMovies;