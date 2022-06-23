import './MoviesCard.css';
import { useState, useRef, useEffect } from 'react';

function MoviesCard({ movie, saveMovie, movieIsSaved, savedSection, handleDelete }) {

  const movieImage = movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image;
  const [saved, setSaved] = useState(movieIsSaved);

  useEffect(() => {
    setSaved(movieIsSaved);
   }, [movieIsSaved]);

  function calculateDuration() {
    const hours = Math.trunc(movie.duration / 60);
    const minutes = movie.duration % 60;
    let result = '';
    hours === 0 ? result = `${minutes}м`: result = `${hours}ч ${minutes}м`;
    return result;
  }

  function handleClickButton() {
    if(saved) handleDelete(movie);
    else saveMovie(movie);
    setSaved(!saved);
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
      {
      savedSection ?
      <button
        className='movies-card__dislike' 
        type='button'
        onClick={handleClickButton}>
      </button> :
      <button
        className={saved ? 'movies-card__like movies-card__like_active': 'movies-card__like'} 
        type='button'
        onClick={handleClickButton}>
        Сохранить
      </button>
      }
    </li>
  );
}

export default MoviesCard;