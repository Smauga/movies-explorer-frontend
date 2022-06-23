import { Link, Switch, Route } from 'react-router-dom';

import './Header.css';
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import HeaderNav from "../HeaderNav/HeaderNav";

function Header({ loggedIn }) {
  return (
    <header className='header'>
      <Link to='' className='header__logo'></Link>
      { loggedIn ? <HeaderNav /> : <HeaderAuth /> }
    </header>
  );
}

export default Header;