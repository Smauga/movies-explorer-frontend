import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import ProtectedRoute from '../../utils/ProtectedRoute';
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
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {

    MainApi.getMe()
    .then(() => setLoggedIn(true))
    .catch(error => console.log('Вы не авторизованы'))
    .finally(() => setIsLoading(true));
  }, []);

  useEffect(() => {
    if(loggedIn)
      MainApi.getMe()
      .then(data => {
        setCurrentUser({ name: data.name, email: data.email });
        MainApi.getMovies()
        .then(savedMovies => {
          setSavedMovies(savedMovies.reverse());
        })
        .catch(error => console.log(error));
        setMovies(sessionStorage.getItem('searchResult') ? JSON.parse(sessionStorage.getItem('searchResult')) : []);
      })
      .catch(error => console.log(error));
  }, [loggedIn, localStorage.getItem('LoggedIn')]);

  async function handleRegister(email, password, name) {
    let registerError;
    await MainApi.register(email, password, name)
    .then(() => {
      handleLogin(email, password);
    })
    .catch(error => registerError = error);
    if(registerError) return Promise.reject(registerError);
  }

  async function handleLogin(email, password) {
    let loginError;
    await MainApi.authorize(email, password)
      .then(data => {
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch(error => loginError = error);
    if(loginError) return Promise.reject(loginError);
  }

  function handleSignout() {
    MainApi.signOut()
      .then(data => {
        sessionStorage.removeItem('shortFilms');
        sessionStorage.removeItem('search');
        sessionStorage.removeItem('searchResult')
        setLoggedIn(false);
        history.push('/');
      })
      .catch(error => console.log(error));
  }

  async function handleEditProfile(name, email) {
    let editError;
    await MainApi.updateMe({ email: email, name: name })
      .then(data => {
        setCurrentUser({ name: data.name, email: data.email });
      })
      .catch(error => editError = error);
      if(editError) return Promise.reject(editError);
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

  async function saveMovie(movie) {
    let saveError;
    await MainApi.addMovie({ country: movie.country || 'не указано',
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
      .catch(error => saveError = error);
    if(!saveError) return Promise.resolve();
    else return Promise.reject()
  }

  async function deleteMovie(movie) {
    let deleteError;
    const deleteMovieID = movie._id || savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)._id;
    await MainApi.deleteMovie(deleteMovieID)
      .then(() => {
        setSavedMovies((movies) => movies.filter((movie) => movie._id !== deleteMovieID));
      })
      .catch(error => deleteError = error);
    if(!deleteError) return Promise.resolve();
    else return Promise.reject()
  }

function handleGoBack() {
  history.goBack();
}

  return (
    <div className="app">
       {isLoading  ?
      <div className="app__container">
      <CurrentUser.Provider value={currentUser}>
          <Switch>
            <Route exact path='/'>
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </Route>
            <Route path='/signin'>
            <ProtectedRoute loggedIn={loggedIn}>
              <Login onClickLogin={handleLogin} />
              </ProtectedRoute>
            </Route>
            
            <Route path='/signup'>
            <ProtectedRoute loggedIn={loggedIn}>
              <Register onClickRegister={handleRegister} />
              </ProtectedRoute>
            </Route>  
            <Route path='/movies'>

              <Header loggedIn={loggedIn} />
              <ProtectedRoute loggedIn={loggedIn}>
              <Movies loggedIn={loggedIn} movies={movies} handleDelete={deleteMovie} savedMovies={savedMovies} setMovies={setMovies} searchMovies={searchMovies} preloader={preloader} saveMovie={saveMovie}/>
                </ProtectedRoute> 
              <Footer />
            
            </Route>
            <Route path='/saved-movies'>
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <SavedMovies savedMovies={savedMovies} handleDelete={deleteMovie} searchMovies={searchMovies}/>
              </ProtectedRoute>
              <Footer />
              
            </Route>
            <Route path='/profile'>
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <Profile onClickSignout={handleSignout} onClickEditProfile={handleEditProfile}/>
              </ProtectedRoute>
            </Route>
            <Route path='*'>
              <NotFoundPage handleGoBack={handleGoBack}/>
            </Route>
          </Switch>
        </CurrentUser.Provider>
      </div>
    : <></>}
    </div>
  );
}

export default App;
