import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ saved }) {
  return (
    <ul className="movies-card-list">
      <MoviesCard saved={saved}/>
      <MoviesCard saved={saved}/>
      <MoviesCard saved={saved}/>
      <MoviesCard saved={saved}/>
      <MoviesCard saved={saved}/>
      <MoviesCard saved={saved}/>
    </ul>
  );
}

export default MoviesCardList;