import './Login.css';

import { useFormWithValidation } from '../../utils/formValidator';
import { useState } from 'react';

import SignInput from "../SignInput/SignInput";
import SignTitle from "../SignTitle/SignTitle";
import SignBottom from "../SignBottom/SignBottom";

function Login({ onClickLogin }) {

  const [errorMessage, setErrorMessage] = useState('');
  const [buttonsIsBlocked, setButtonsIsBlocked] = useState(false);
  const useForm = useFormWithValidation();

  // Изменение инпутов
  function handleChange(e) { useForm.handleChange(e) }
  
  // Отправка инпутов
  function handleSubmit(e) {
    setButtonsIsBlocked(true);
    e.preventDefault();
    onClickLogin(useForm.values.email, useForm.values.password)
      .catch((error) => {
        setButtonsIsBlocked(false);
        error ===  400 ? 
        setErrorMessage('Вы ввели неправильный логин или пароль') : 
        setErrorMessage('При авторизации произошла ошибка')
  });
  }

  return (
    <form className='login' onSubmit={handleSubmit}>
      <div className='login__container'>
        <SignTitle text='Рады видеть!' />
        <SignInput
          label='E-mail'
          name='email'
          type='email'
          pattern='(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
          onChange={handleChange}
          isValid={useForm.errors.email}/>
        <SignInput
          label='Пароль'
          name='password'
          type='password'
          onChange={handleChange}
          isValid={useForm.errors.password}/>
      </div>
      <SignBottom 
        buttonsIsBlocked={buttonsIsBlocked}
        errorMessage={errorMessage}
        buttonText='Войти'
        isValid={useForm.isValid}
        linkDescription='Ещё не зарегистрированы?'
        linkText='Регистрация'
        linkTo='signup'/>
    </form>
  );
}

export default Login;