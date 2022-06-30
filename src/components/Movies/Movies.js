import './Movies.css';

import { useState, useEffect } from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import Preloader from "../Preloader/Preloader";
import { 
  notFoundMoviesMessage, 
  notFoundMoviesErrorMessage, 
  tabletWidth, 
  mobileWidth,
  numberOfInitialMoviesOnPC,
  numberOfInitialMoviesOnTablet,
  numberOfInitialMoviesOnMobile,
  movieRenderingStepOnPC,
  movieRenderingStepOnNotPC,
  timeoutResizeThrottler
} from '../../utils/constants';

function Movies({ 
  filtredMoviesList,
  onDeleteMovieClick,
  savedMoviesList,
  onSearchClick,
  isVisiblePreloader,
  onSaveMovieClick
}) {

  const [renderedMovies, setRenderedMovies] = useState({initial: 0, step: 0});
  const [countMoreMovies, setCountMoreMovies] = useState(0);
  const [savedMoviesIdList, setSavedMoviesIdList] = useState([]);
  const [searchMessage, setSearchMessage] = useState(notFoundMoviesMessage);

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
        }, timeoutResizeThrottler);
      }
    }
  }, []);

  // Определение количества карточек в зависимости от ширины экрана
  function calculateWidth() {
    if(document.documentElement.clientWidth >= tabletWidth) setRenderedMovies({initial: numberOfInitialMoviesOnPC, step: movieRenderingStepOnPC});
    else if(document.documentElement.clientWidth < mobileWidth) setRenderedMovies({initial: numberOfInitialMoviesOnMobile, step: movieRenderingStepOnNotPC});
    else setRenderedMovies({initial: numberOfInitialMoviesOnTablet, step: movieRenderingStepOnNotPC});
  }

  // Нажатие на кнопку "Еще"
  function renderMoreMovies() {setCountMoreMovies(countMoreMovies + 1)}

  // Поиск фильмов по введенному тексту
  function handleSearchMovies(enteredSearchText, shortMoviesCheckbox, isPageSavedMovies) {
    
    onSearchClick(enteredSearchText, shortMoviesCheckbox, isPageSavedMovies)
    .then(() => setSearchMessage(notFoundMoviesMessage))
    .catch(() => setSearchMessage(notFoundMoviesErrorMessage));
  }

  return (
    <section className='movies'>
      <SearchForm
        onSearchClick={handleSearchMovies}
        savedShortMoviesCheckbox={sessionStorage.getItem('shortMoviesCheckbox')}
        savedEnteredSearchText={sessionStorage.getItem('enteredSearchText')}
        isPageSavedMovies={false}/>
      {isVisiblePreloader && <Preloader />}
      {filtredMoviesList.length === 0 && !isVisiblePreloader ?
        <p className='movies__not-found'>{searchMessage}</p> :
        <MoviesCardList>
          {filtredMoviesList.slice(0, renderedMovies.initial + countMoreMovies * renderedMovies.step).map((movie) => {
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
      {renderedMovies.initial + countMoreMovies * renderedMovies.step < filtredMoviesList.length && 
      <MoreMoviesButton renderMoreMovies={renderMoreMovies}/>}
    </section>
  );
}

export default Movies;
