import './App.css';

import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
import Preloader from "../Preloader/Preloader";
import { CurrentUser } from '../../contexts/CurrentUserContext';
import { filterMovies } from '../../utils/filterMovies';

function App() {

  const history = useHistory();
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isVisiblePreloader, setIsVisiblePreloader] = useState(false);

  // Проверка пользователя при запуске
  useEffect(() => {
    setIsVisiblePreloader(true);
    MainApi.getMe()
      .then(() => setLoggedIn(true))
      .catch(() => {
        console.log('Вы не авторизованы');
        setIsLoading(true);
      })
      .finally(() => setIsVisiblePreloader(false));
  }, []);

  // Обновление информации о пользователе
  useEffect(() => {
    if(loggedIn)
      MainApi.getMe()
        .then(data => {
          setCurrentUser({ name: data.name, email: data.email });
          MainApi.getMovies()
            .then(savedMovies => {
              setSavedMoviesList(savedMovies.reverse());
              setIsLoading(true);
            })
            .catch(error => console.log(error));
          const foundMoviesLocal = sessionStorage.getItem('foundMovies');
          setMoviesList(foundMoviesLocal ? JSON.parse(foundMoviesLocal) : []);
        })
      .catch(error => console.log(error));
  }, [loggedIn]);

  // Регистрация пользователя
  async function handleRegister(email, password, name) {
    let registerError;
    await MainApi.register(email, password, name)
      .then(() => handleLogin(email, password))
      .catch(error => registerError = error);
    if(registerError) return Promise.reject(registerError);
  }

  // Авторизация пользователя
  async function handleLogin(email, password) {
    let loginError;
    await MainApi.authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch(error => loginError = error);
    if(loginError) return Promise.reject(loginError);
  }

  // Выход из аккаунта пользователя
  function handleSignout() {
    MainApi.signOut()
      .then(() => {
        sessionStorage.removeItem('shortMoviesCheckbox');
        sessionStorage.removeItem('enteredSearchText');
        sessionStorage.removeItem('foundMovies')
        setLoggedIn(false);
        history.push('/');
      })
      .catch(error => console.log(error));
  }

  // Изменение данных пользователя
  async function handleEditProfile(name, email) {
    let editError;
    await MainApi.updateMe({ email: email, name: name })
      .then(data => setCurrentUser({ name: data.name, email: data.email }))
      .catch(error => editError = error);
    if(!editError) return Promise.resolve();
    else return Promise.reject(editError);
  }

  // Поиск и фильтрация фильмов
  async function handleSearchMovies(enteredSearchText, shortMoviesCheckbox, isPageSavedMovies) {
    let searchError;
    if(isPageSavedMovies) {
      setSavedMoviesList([]);
      await MainApi.getMovies()
        .then(savedMovies => {
          const searchResult = filterMovies(savedMovies, enteredSearchText, shortMoviesCheckbox);
          setSavedMoviesList(searchResult.reverse());
        })
        .catch(error => searchError = error);
      }
    else {
      setMoviesList([]);
      setIsVisiblePreloader(true);
      await MoviesApi.getMovies()
        .then(movies => {
          const searchResult = filterMovies(movies, enteredSearchText, shortMoviesCheckbox);
          setMoviesList(searchResult);
          sessionStorage.setItem('shortMoviesCheckbox', shortMoviesCheckbox);
          sessionStorage.setItem('enteredSearchText', enteredSearchText);
          sessionStorage.setItem('foundMovies', JSON.stringify(searchResult));
        })
        .catch(error => searchError = error)
        .finally(() => setIsVisiblePreloader(false));
      }
    if(!searchError) return Promise.resolve();
    else return Promise.reject();
  }

  // Сохранить фильм
  async function handleSaveMovie(movie) {
    let saveError;
    await MainApi.addMovie({ 
      country: movie.country || 'не указано',
      director: movie.director || 'не указано',
      duration: movie.duration || 'не указано',
      year: movie.year || 'не указано',
      description: movie.description || 'не указано',
      image: `https://api.nomoreparties.co${movie.image.url}` || 'не указано',
      trailerLink: movie.trailerLink || 'не указано',
      thumbnail: `https://api.nomoreparties.co${movie.image.url}` || 'не указано',
      movieId: movie.id || 'не указано',
      nameRU: movie.nameRU || 'не указано',
      nameEN: movie.nameEN || 'не указано'
    })
      .then(newMovie => {
        setSavedMoviesList([newMovie, ...savedMoviesList])
      })
      .catch(error => saveError = error);
    if(!saveError) return Promise.resolve();
    else return Promise.reject()
  }

  // Удалить фильм
  async function handleDeleteMovie(movie) {
    let deleteError;
    const deleteMovieID = movie._id || savedMoviesList.find((savedMovie) => savedMovie.movieId === movie.id)._id;
    await MainApi.deleteMovie(deleteMovieID)
      .then(() => setSavedMoviesList((movies) => movies.filter((movie) => movie._id !== deleteMovieID)))
      .catch(error => deleteError = error);
    if(!deleteError) return Promise.resolve();
    else return Promise.reject();
  }

  // Вернуться назад
  function handleGoBack() { history.goBack() }

  return (
    <div className={!isLoading ? 'app app_loading' : 'app'}>
      {(isVisiblePreloader && !loggedIn) && <Preloader />}
      {isLoading && <div className="app__container">
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
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <Movies 
                  moviesList={moviesList}
                  savedMoviesList={savedMoviesList}
                  isVisiblePreloader={isVisiblePreloader}
                  onSearchClick={handleSearchMovies}
                  onDeleteMovieClick={handleDeleteMovie} 
                  onSaveMovieClick={handleSaveMovie}/>
                <Footer />
              </ProtectedRoute>
            </Route>

            <Route path='/saved-movies'>
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <SavedMovies
                  savedMoviesList={savedMoviesList}
                  onDeleteMovieClick={handleDeleteMovie}
                  onSearchClick={handleSearchMovies}/>
                <Footer />
              </ProtectedRoute>
            </Route>

            <Route path='/profile'>
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <Profile
                onClickSignout={handleSignout}
                onClickEditProfile={handleEditProfile}/>
              </ProtectedRoute>
            </Route>

            <Route path='*'>
              <NotFoundPage onClickBack={handleGoBack}/>
            </Route>
            
          </Switch>
        </CurrentUser.Provider>
      </div>}
    </div>
  );
}

export default App;
