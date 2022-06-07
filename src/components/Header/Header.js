import './Header.css';

import HeaderAuth from "../HeaderAuth/HeaderAuth";
import HeaderNav from "../HeaderNav/HeaderNav";
import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className='header'>
      <a className='header__logo' href='#'><img src={logo} /></a>
      {/* <HeaderAuth /> */}
      <HeaderNav />
    </header>
  );
}

export default Header;