import './HeaderAuth.css';

function HeaderAuth() {
  return (
    <div className='header-auth'>
      <a className='header-auth__link' href='#'>Регистрация</a>
      <a className='header-auth__link header-auth__link_green' href='#'>Войти</a>
    </div>
  );
}

export default HeaderAuth;