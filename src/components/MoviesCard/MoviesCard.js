import './MoviesCard.css';

import { useState } from 'react';

function MoviesCard({ movie, onSaveMovieClick, movieIsSaved, isPageSavedMovies, onDeleteMovieClick }) {

  const movieImage = movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image;
  const [savedMovie, setSavedMovie] = useState(movieIsSaved);

  // Перевод длительности фильма в формат часы/минуты
  function calculateDuration() {
    const hours = Math.trunc(movie.duration / 60);
    const minutes = movie.duration % 60;
    let result = '';
    hours === 0 ? result = `${minutes}м`: result = `${hours}ч ${minutes}м`;
    return result;
  }

  // Сохранить/удалить фильм
  function handleClickButton() {
    if(savedMovie) {onDeleteMovieClick(movie)
      .then(() => setSavedMovie(!savedMovie))
      .catch(() => console.log('При удалении фильма произошла ошибка'))
    }
    else {
      onSaveMovieClick(movie)
        .then(() => setSavedMovie(!savedMovie))
        .catch(() => console.log('При сохранении фильма произошла ошибка'))
      }  
    }

  return (
    <li className='movies-card'>
      <a href={movie.trailerLink} target='_blank'>
        <img className='movies-card__image' src={movieImage} alt={movie.nameRU}/>
      </a>
      <div className='movies-card__info'>
        <h2 className='movies-card__name'>{movie.nameRU}</h2>
        <p className='movies-card__duration'>{calculateDuration()}</p>
      </div>
      {isPageSavedMovies ?
        <button
          className='movies-card__dislike' 
          type='button'
          onClick={handleClickButton}>
        </button> :
        <button
          className={savedMovie ? 'movies-card__like movies-card__like_active': 'movies-card__like'} 
          type='button'
          onClick={handleClickButton}>
            Сохранить
        </button>
      }
    </li>
  );
}

export default MoviesCard;