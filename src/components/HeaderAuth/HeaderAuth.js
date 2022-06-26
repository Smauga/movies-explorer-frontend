import './HeaderAuth.css';

import { Link } from 'react-router-dom';

function HeaderAuth() {
  return (
    <div className='header-auth'>
      <Link to='signup' className='header-auth__link'>Регистрация</Link>
      <Link to='signin' className='header-auth__link header-auth__link_color_green'>Войти</Link>
    </div>
  );
}

export default HeaderAuth;