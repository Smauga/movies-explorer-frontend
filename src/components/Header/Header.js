import { Link, Switch, Route } from 'react-router-dom';

import './Header.css';
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import HeaderNav from "../HeaderNav/HeaderNav";

function Header() {
  return (
    <header className='header'>
      <Link to='' className='header__logo'></Link>
      <Switch>
        <Route exact path='/'>
          <HeaderAuth />
        </Route>
        <HeaderNav />
      </Switch>
    </header>
  );
}

export default Header;