import './HeaderNav.css';

import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function HeaderNav() {

  const [menu, setMenu] = useState(false);

  const handleMenuClick = () => {
    setMenu(!menu);
  };
  

  return (
    <div className={ menu ? 'header-nav header-nav_opened' : 'header-nav'}>
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
            className='header-nav__link header-nav__link_tablet-only'
            onClick={handleMenuClick}>
            Главная
          </NavLink>
          <NavLink
            to='/movies'
            activeClassName='header-nav__link_active'
            className='header-nav__link'
            onClick={handleMenuClick}>
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            activeClassName='header-nav__link_active'
            className='header-nav__link'
            onClick={handleMenuClick}>
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink 
          to='profile'
          className='header-nav__account-button'
          activeClassName='header-nav__account-button_active'
          onClick={handleMenuClick}>
          Аккаунт
        </NavLink>
      </nav>
    </div>
  );
}

export default HeaderNav;