import './HeaderNav.css';
import accountIcon from '../../images/account-icon.svg';

function HeaderNav() {
  return (
    <div className='header-nav'>
      <div className='header-nav__overlay '></div>
      <div className='header-nav__menu header-nav__menu_opened'>
        <div className='header-nav__menu-first-line'></div>
        <div className='header-nav__menu-second-line'></div>
        <div className='header-nav__menu-third-line'></div>
      </div>
      <nav className='header-nav__container'>
        <div className='header-nav__links'>
          <a className='header-nav__link header-nav__link_tablet-only'>Главная</a>
          <a className='header-nav__link'>Фильмы</a>
          <a className='header-nav__link'>Сохранённые фильмы</a>
        </div>
        <a className='header-nav__account-button' href='#'>
          <img className='header-nav__account-icon' src={accountIcon} />
          <p className='header-nav__account-button-text'>Аккаунт</p>
        </a>
      </nav>
    </div>
  );
}

export default HeaderNav;