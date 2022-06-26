import './Header.css';

import { Link } from 'react-router-dom';

import HeaderAuth from "../HeaderAuth/HeaderAuth";
import HeaderNav from "../HeaderNav/HeaderNav";

function Header({ loggedIn }) {
  return (
    <header className='header'>
      <Link to='/' className='header__logo'></Link>
      { loggedIn ? <HeaderNav /> : <HeaderAuth /> }
    </header>
  );
}

export default Header;