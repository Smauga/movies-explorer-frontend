import './Register.css';
import SignInput from "../SignInput/SignInput";
import SignTitle from "../SignTitle/SignTitle";
import SignBottom from "../SignBottom/SignBottom";
import { useFormWithValidation } from '../../utils/formValidator';
import { useState, useEffect } from 'react';

function Register({ onClickRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
 const validation = useFormWithValidation();
// console.log(validation.handleChange);
  // useEffect(() => { 
    
  // }, []);

  function handleChange(e) {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      validation.handleChange(e);
      console.log(validation.values);
      console.log(validation.errors);
      console.log(validation.isValid);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
      validation.handleChange(e);
    }
    if (e.target.name === 'name') {
      setName(e.target.value);
      validation.handleChange(e);
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onClickRegister(email, password, name);
  }

  return (
    <form className='register' onSubmit={handleSubmit}>
      <div className='register__container'>
        <SignTitle text='Добро пожаловать!' />
        <SignInput name='Имя' type='name' onChange={handleChange}/>
        <SignInput name='E-mail' type='email' onChange={handleChange}/>
        <SignInput name='Пароль' type='password' onChange={handleChange}/>
      </div>
      <SignBottom
        buttonText='Зарегистрироваться'
        linkDescription='Уже зарегистрированы?'
        linkText='Войти'
        linkTo='signin'
        />
    </form>
  );
}

export default Register;