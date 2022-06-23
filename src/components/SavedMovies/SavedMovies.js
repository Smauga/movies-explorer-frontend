import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies({ savedMovies, handleDelete, searchMovies }) {

  return (
    <section className="saved-movies">
      <SearchForm onSearchClick={searchMovies} savedSection={true}/>
        {savedMovies.length === 0 ?
        <p className='saved-movies__not-found'>Ничего не найдено</p> :
        <MoviesCardList saved={true}>
          {savedMovies.map((savedMovie) =>
            <MoviesCard movie={savedMovie}
              key={savedMovie.movieId}
              handleDelete={handleDelete}
              savedSection={true}
              movieIsSaved={true}/> 
            )
          }
        </MoviesCardList>}
    </section>
  );
}

export default SavedMovies;