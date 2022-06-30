import './MoreMoviesButton.css';

function MoreMoviesButton({ renderMoreMovies }) {
  return (
    <button className='more-movies-button' type='button' onClick={renderMoreMovies}>Ещё</button>
  );
}

export default MoreMoviesButton;