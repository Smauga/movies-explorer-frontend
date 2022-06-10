import './MoviesCard.css';
import movieImage from '../../images/movie-image.jpg';

const handleLikeCard = () => {
  const likeButtons = document.querySelectorAll('.movies-card__like');
  likeButtons.forEach(button => {
    button.classList.toggle('movies-card__like_active');
  });
};

function MoviesCard({ saved }) {
  return (
    <li className='movies-card'>
      <img className='movies-card__image' src={movieImage} />
      <div className='movies-card__info'>
        <h2 className='movies-card__name'>Gimme Danger: История Игги qwfqwfq qwf qf qwfqw fqw fqwfqwf </h2>
        <p className='movies-card__duration'>1ч 17м</p>
      </div>
      <button className={ 
        saved ? 
       'movies-card__dislike':
       'movies-card__like'} 
        type='button'
        onClick={handleLikeCard}>
        Сохранить
      </button>


    </li>
  );
}

export default MoviesCard;