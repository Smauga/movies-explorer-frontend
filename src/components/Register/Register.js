import './Register.css';

import { useFormWithValidation } from '../../utils/formValidator';
import { useState } from 'react';

import SignInput from "../SignInput/SignInput";
import SignTitle from "../SignTitle/SignTitle";
import SignBottom from "../SignBottom/SignBottom";

function Register({ onClickRegister }) {

  const [errorMessage, setErrorMessage] = useState('');
  const useForm = useFormWithValidation();

  // Изменение инпутов
  function handleChange(e) { useForm.handleChange(e) }
  
   // Отправка инпутов
  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    onClickRegister(useForm.values.email, useForm.values.password, useForm.values.name)
      .catch((error) => 
        error ===  409? 
        setErrorMessage('Пользователь с таким email уже существует.') : 
        setErrorMessage('При регистрации пользователя произошла ошибка.')
      );
    e.target.reset();
    useForm.resetForm();
  }

  return (
    <form className='register' onSubmit={handleSubmit}>
      <div className='register__container'>
        <SignTitle text='Добро пожаловать!' />
        <SignInput
          label='Имя'
          name='name'
          type='name'
          onChange={handleChange}
          isValid={useForm.errors.name}
          minLength={2}
          maxLength={30}
          pattern={'[A-Za-zА-ЯЁа-яё1-9 -]+$'}/>
        <SignInput
          label='E-mail'
          type='email'
          name='email'
          pattern='(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
          isValid={useForm.errors.email}
          onChange={handleChange}/>
        <SignInput
          label='Пароль'
          name='password'
          type='password'
          isValid={useForm.errors.password}
          onChange={handleChange}/>
      </div>
      <SignBottom
        errorMessage={errorMessage}
        buttonText='Зарегистрироваться'
        isValid={useForm.isValid}
        linkDescription='Уже зарегистрированы?'
        linkText='Войти'
        linkTo='signin'
        />
    </form>
  );
}

export default Register;