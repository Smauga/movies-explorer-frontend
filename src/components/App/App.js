import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";
import { CurrentUser } from '../../contexts/CurrentUserContext';
import { filterMovies } from '../../utils/filterMovies';

function App() {

  const history = useHistory();
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
   MainApi.getMe()
    .then((data) => {
      setLoggedIn(true);
      MainApi.getMovies()
      .then(savedMovies => {
        setSavedMovies(savedMovies.reverse());
      })
      .catch(error => console.log(error));
      setMovies(JSON.parse(sessionStorage.getItem('searchResult')));
    })
    .catch(error => console.log('Вы не авторизованы'));
  }, []);

  useEffect(() => {
    if(loggedIn)
      MainApi.getMe()
      .then(data => {
        setCurrentUser({ name: data.name, email: data.email });
      })
      .catch(error => console.log(error));
  }, [loggedIn]);

  function handleRegister(email, password, name) {
    MainApi.register(email, password, name)
    .then(() => {
      handleLogin(email, password);
    })
    .catch(error => console.log(error));
  }

  function handleLogin(email, password) {
    MainApi.authorize(email, password)
      .then(data => {
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch(error => console.log(error));
  }

  function handleSignout() {
    MainApi.signOut()
      .then(data => {
        setLoggedIn(false);
        history.push('/');
      })
      .catch(error => console.log(error));
  }

  function handleEditProfile(name, email) {
    MainApi.updateMe({ email: email, name: name })
      .then(data => {
        setCurrentUser({ name: data.name, email: data.email });
      })
      .catch(error => console.log(error));
  }

  function searchMovies(search, shortFilms, savedSection) {
    if(savedSection) {
      setSavedMovies([]);
      MainApi.getMovies()
      .then(savedMovies => {
        const searchResult = filterMovies(savedMovies, search, shortFilms);
        setSavedMovies(searchResult.reverse());
      })
      .catch(error => console.log(error));
    }
    else {
    setMovies([]);
    setPreloader(true);
    MoviesApi.getMovies()
      .then(movies => {
        const searchResult = filterMovies(movies, search, shortFilms);
        setMovies(searchResult);
        sessionStorage.setItem('shortFilms', shortFilms);
        sessionStorage.setItem('search', search);
        sessionStorage.setItem('searchResult', JSON.stringify(searchResult));
      })
      .catch(error => console.log(error))
      .finally(() => {
        setPreloader(false);
      });
    }
  }

  function saveMovie(movie) {
    MainApi.addMovie({ country: movie.country || 'не указано',
      director: movie.director || 'не указано',
      duration: movie.duration || 'не указано',
      year: movie.year || 'не указано',
      description: movie.description || 'не указано',
      image: `https://api.nomoreparties.co${movie.image.url}` || 'не указано',
      trailerLink: movie.trailerLink || 'не указано',
      thumbnail: `https://api.nomoreparties.co${movie.image.url}` || 'не указано',
      movieId: movie.id || 'не указано',
      nameRU: movie.nameRU || 'не указано',
      nameEN: movie.nameEN || 'не указано' })
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch(error => console.log(error));
  }

  function deleteMovie(movie) {
    const deleteMovieID = movie._id || savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)._id;
    MainApi.deleteMovie(deleteMovieID)
      .then(() => {
        setSavedMovies((movies) => movies.filter((movie) => movie._id !== deleteMovieID));
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="app">
      <div className="app__container">
      <CurrentUser.Provider value={currentUser}>
          <Switch>
            <Route exact path='/'>
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </Route>
            <Route path='/signin'>
              <Login onClickLogin={handleLogin} />
            </Route>
            <Route path='/signup'>
              <Register onClickRegister={handleRegister} />
            </Route>  
            <Route path='/movies'>
              <Header loggedIn={loggedIn} />
              <Movies movies={movies} handleDelete={deleteMovie} savedMovies={savedMovies} setMovies={setMovies} searchMovies={searchMovies} preloader={preloader} saveMovie={saveMovie}/>
              <Footer />
            </Route>
            <Route path='/saved-movies'>
              <Header loggedIn={loggedIn} />
              <SavedMovies savedMovies={savedMovies} handleDelete={deleteMovie} searchMovies={searchMovies}/>
              <Footer />
            </Route>
            <Route path='/profile'>
              <Header loggedIn={loggedIn} />
              <Profile onClickSignout={handleSignout} onClickEditProfile={handleEditProfile}/>
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
        </CurrentUser.Provider>
      </div>
    </div>
  );
}

export default App;
