import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import Preloader from "../Preloader/Preloader";


function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <MoreMoviesButton />
      {/* <Preloader /> */}
    </section>
  );
}

export default Movies;
