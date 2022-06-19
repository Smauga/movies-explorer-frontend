import { NavLink } from 'react-router-dom';

import './HeaderNav.css';

const handleMenuClick = () => {
  const menu = document.querySelector('.header-nav');  
  menu.classList.toggle('header-nav_opened');
};

function HeaderNav() {
  return (
    <div className='header-nav'>
      <div className='header-nav__overlay'></div>
      <div className='header-nav__menu' onClick={handleMenuClick}>
        <div className='header-nav__menu-first-line'></div>
        <div className='header-nav__menu-second-line'></div>
        <div className='header-nav__menu-third-line'></div>
      </div>
      <nav className='header-nav__container'>
        <div className='header-nav__links'>
          <NavLink
            exact to='/'
            activeClassName='header-nav__link_active'
            className='header-nav__link header-nav__link_tablet-only'>
            Главная
          </NavLink>
          <NavLink
            to='/movies'
            activeClassName='header-nav__link_active'
            className='header-nav__link'>
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            activeClassName='header-nav__link_active'
            className='header-nav__link'>
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink 
          to='profile'
          className='header-nav__account-button'
          activeClassName='header-nav__account-button_active'>
          Аккаунт
        </NavLink>
      </nav>
    </div>
  );
}

export default HeaderNav;