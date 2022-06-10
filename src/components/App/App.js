import { Route, Switch } from 'react-router-dom';

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

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Switch>
          <Route exact path='/'>
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route path='/signin'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Register />
          </Route>  
          <Route path='/movies'>
            <Header />
            <Movies />
            <Footer />
          </Route>
          <Route path='/saved-movies'>
            <Header />
            <SavedMovies />
            <Footer />
          </Route>
          <Route path='/profile'>
            <Header />
            <Profile />
          </Route>
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
