import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import Preloader from "../Preloader/Preloader";

import { useState, useEffect } from 'react';

function Movies({ movies, handleDelete, savedMovies, searchMovies, preloader, saveMovie }) {

  
  const [loadedMoves, setLoadedMoves] = useState({initial: 0, step: 0});
  const [loadedMoreMoves, setLoadedMoreMoves] = useState(0);
  const [searchMessage, setSearchMessage] = useState('Ничего не найдено');

  useEffect(() => {
    calculateWidth(); 
    window.addEventListener("resize", resizeThrottler, false);
    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          calculateWidth(); 
         }, 66);
      }
    }
  }, []);

  function calculateWidth() {
    if(document.documentElement.clientWidth >= 797) setLoadedMoves({initial: 12, step: 3});
    else if(document.documentElement.clientWidth < 545) setLoadedMoves({initial: 5, step: 2});
    else setLoadedMoves({initial: 8, step: 2});
  }

  function renderMoreMovies() {setLoadedMoreMoves(loadedMoreMoves + 1)}

  function handleSearchMovies(search, shortFilms, savedSection) {
    searchMovies(search, shortFilms, savedSection)
    .then(() => {setSearchMessage('Ничего не найдено')})
    .catch(() => {setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')});
  }

  return (
    <section className="movies">
      <SearchForm onSearchClick={handleSearchMovies} savedShortFilms={sessionStorage.getItem('shortFilms')} savedSearch={sessionStorage.getItem('search')} savedSection={false}/>
      {preloader && <Preloader />}
      {movies.length === 0 && !preloader ?
      <p className='movies__not-found'>{searchMessage}</p> :
      <MoviesCardList>
        {movies.slice(0, loadedMoves.initial + loadedMoreMoves * loadedMoves.step).map((movie) => {
          const savedMoviesId = savedMovies.map((movie) => movie.movieId);
          const isSaved = savedMoviesId.includes(movie.id);
          return <MoviesCard
            movie={movie}
            key={movie.id}
            handleDelete={handleDelete}
            saveMovie={saveMovie}
            movieIsSaved={isSaved}/>}
          )
        }
      </MoviesCardList>}
      {loadedMoves.initial + loadedMoreMoves * loadedMoves.step < movies.length && 
      <MoreMoviesButton renderMoreMovies={renderMoreMovies}/>}
    </section>
  );
}

export default Movies;
