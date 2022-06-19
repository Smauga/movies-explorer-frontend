import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

const saved = true;

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList saved={true}>
        <MoviesCard saved={saved}/>
        <MoviesCard saved={saved}/>
      </MoviesCardList>
    </section>
  );
}

export default SavedMovies;