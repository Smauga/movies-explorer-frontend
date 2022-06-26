import './Movies.css';

import { useState, useEffect } from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import Preloader from "../Preloader/Preloader";

function Movies({ 
  moviesList,
  onDeleteMovieClick,
  savedMoviesList,
  onSearchClick,
  isVisiblePreloader,
  onSaveMovieClick
}) {

  const [renderedMovies, setRenderedMovies] = useState({initial: 0, step: 0});
  const [countMoreMovies, setCountMoreMovies] = useState(0);
  const [savedMoviesIdList, setSavedMoviesIdList] = useState([]);
  const [searchMessage, setSearchMessage] = useState('Ничего не найдено');

  // Сохранение ID сохраненных фильмов и установка слушателя ширины экрана
  useEffect(() => {
    calculateWidth();
    setSavedMoviesIdList(() => savedMoviesList.map((movie) => movie.movieId));
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


  // Определение количества карточек в зависимости от ширины экрана
  function calculateWidth() {
    if(document.documentElement.clientWidth >= 797) setRenderedMovies({initial: 12, step: 3});
    else if(document.documentElement.clientWidth < 545) setRenderedMovies({initial: 5, step: 2});
    else setRenderedMovies({initial: 8, step: 2});
  }

  // Нажатие на кнопку "Еще"
  function renderMoreMovies() {setCountMoreMovies(countMoreMovies + 1)}

  // Поиск фильмов по введенному тексту
  function handleSearchMovies(enteredSearchText, shortMoviesCheckbox, isPageSavedMovies) {
    onSearchClick(enteredSearchText, shortMoviesCheckbox, isPageSavedMovies)
    .then(() => {setSearchMessage('Ничего не найдено')})
    .catch(() => {setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')});
  }

  return (
    <section className='movies'>
      <SearchForm
        onSearchClick={handleSearchMovies}
        savedShortMoviesCheckbox={sessionStorage.getItem('shortMoviesCheckbox')}
        savedEnteredSearchText={sessionStorage.getItem('enteredSearchText')}
        isPageSavedMovies={false}/>
      {isVisiblePreloader && <Preloader />}
      {moviesList.length === 0 && !isVisiblePreloader ?
        <p className='movies__not-found'>{searchMessage}</p> :
        <MoviesCardList>
          {moviesList.slice(0, renderedMovies.initial + countMoreMovies * renderedMovies.step).map((movie) => {
            const isSavedMovie = savedMoviesIdList.includes(movie.id);
            return <MoviesCard
              movie={movie}
              key={movie.id}
              onDeleteMovieClick={onDeleteMovieClick}
              onSaveMovieClick={onSaveMovieClick}
              movieIsSaved={isSavedMovie}/>}
            )
          }
      </MoviesCardList>}
      {renderedMovies.initial + countMoreMovies * renderedMovies.step < moviesList.length && 
      <MoreMoviesButton renderMoreMovies={renderMoreMovies}/>}
    </section>
  );
}

export default Movies;
