// URL
const mainServerAddress = 'https://api.movies-explorer.smaug.nomoredomains.xyz';
const moviesServerAddress = 'https://api.nomoreparties.co';

// App
const notAuthorizedMessage = 'Вы не авторизованы';
const notEnteredField = 'Не указано';

// Login
const loginBadRequestErrorMessage = 'Вы ввели неправильный логин или пароль';
const loginServerErrorMessage = 'При авторизации произошла ошибка';

// Register
const registerConflictErrorMessage = 'Пользователь с таким email уже существует';
const registerServerErrorMessage = 'При регистрации пользователя произошла ошибка';

// Movies
const notFoundMoviesMessage = 'Ничего не найдено';
const notFoundMoviesErrorMessage = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const tabletWidth = 797;
const mobileWidth = 545;
const numberOfInitialMoviesOnPC = 12;
const numberOfInitialMoviesOnTablet = 8;
const numberOfInitialMoviesOnMobile = 5;
const movieRenderingStepOnPC = 3
const movieRenderingStepOnNotPC = 2;
const timeoutResizeThrottler = 66;

// filterMovies
const shortMoviesDuration = 40;

// MoviesCard
const deleteMovieErrorMessage = 'При удалении фильма произошла ошибка';
const saveMovieErrorMessage = 'При сохранении фильма произошла ошибка';

// Profile
const profileUpdateSussessMesssage = 'Профиль успешно обновлен';
const profileUpdateConflictMesssage = 'Пользователь с таким email уже существует';
const profileUpdateServerMesssage = 'При обновлении профиля произошла ошибка';

module.exports = {
  mainServerAddress,
  moviesServerAddress,
  notAuthorizedMessage,
  notEnteredField,
  loginBadRequestErrorMessage,
  loginServerErrorMessage,
  registerConflictErrorMessage,
  registerServerErrorMessage,
  notFoundMoviesMessage,
  notFoundMoviesErrorMessage,
  tabletWidth,
  mobileWidth,
  numberOfInitialMoviesOnPC,
  numberOfInitialMoviesOnTablet,
  numberOfInitialMoviesOnMobile,
  movieRenderingStepOnPC,
  movieRenderingStepOnNotPC,
  timeoutResizeThrottler,
  shortMoviesDuration,
  deleteMovieErrorMessage,
  saveMovieErrorMessage,
  profileUpdateSussessMesssage,
  profileUpdateConflictMesssage,
  profileUpdateServerMesssage
}