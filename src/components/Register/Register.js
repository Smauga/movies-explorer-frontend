import './Register.css';
import SignInput from "../SignInput/SignInput";
import SignTitle from "../SignTitle/SignTitle";
import SignBottom from "../SignBottom/SignBottom";
import { useFormWithValidation } from '../../utils/formValidator';
import { useState } from 'react';

function Register({ onClickRegister }) {

  const [errorMessage, setErrorMessage] = useState('');
  const useForm = useFormWithValidation();

  function handleChange(e) {
    useForm.handleChange(e);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    onClickRegister(useForm.values.email, useForm.values.password, useForm.values.name)
      .catch((error) => {
        error.status ===  409? 
        setErrorMessage('Пользователь с таким email уже существует.') : 
        setErrorMessage('При регистрации пользователя произошла ошибка.');
      });
    e.target.reset();
    useForm.resetForm();
  }

  return (
    <form className='register' onSubmit={handleSubmit}>
      <div className='register__container'>
        <SignTitle text='Добро пожаловать!' />
        <SignInput name='Имя' type='name' onChange={handleChange} isValid={useForm.errors.name} minLength={2} maxLength={30} pattern={'[A-Za-zА-ЯЁа-яё1-9 -]+$'}/>
        <SignInput name='E-mail' type='email' isValid={useForm.errors.email} onChange={handleChange}/>
        <SignInput name='Пароль' type='password' isValid={useForm.errors.password} onChange={handleChange}/>
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