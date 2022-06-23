import './Login.css';
import SignInput from "../SignInput/SignInput";
import SignTitle from "../SignTitle/SignTitle";
import SignBottom from "../SignBottom/SignBottom";

import { useState } from 'react';

function Login({ onClickLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onClickLogin(email, password);
  }

  return (
    <form className='login' onSubmit={handleSubmit}>
      <div className='login__container'>
        <SignTitle text='Рады видеть!' />
        <SignInput name='E-mail' type='email' onChange={handleChange} />
        <SignInput name='Пароль' type='password' onChange={handleChange} />
      </div>
      <SignBottom buttonText='Войти'  linkDescription='Ещё не зарегистрированы?' linkText='Регистрация' linkTo='signup'/>
    </form>
  );
}

export default Login;