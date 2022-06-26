import './Login.css';
import SignInput from "../SignInput/SignInput";
import SignTitle from "../SignTitle/SignTitle";
import SignBottom from "../SignBottom/SignBottom";
import { useFormWithValidation } from '../../utils/formValidator';
import { useState } from 'react';

function Login({ onClickLogin }) {

  const [errorMessage, setErrorMessage] = useState('');
  const useForm = useFormWithValidation();

  function handleChange(e) {
    useForm.handleChange(e);
}
  
function handleSubmit(e) {
  e.preventDefault();
  onClickLogin(useForm.values.email, useForm.values.password)
    .catch((error) => {
      error.status ===  400 ? 
      setErrorMessage('Вы ввели неправильный логин или пароль.') : 
      setErrorMessage('При авторизации произошла ошибка.');
    });
  e.target.reset();
  useForm.resetForm();
}

  return (
    <form className='login' onSubmit={handleSubmit}>
      <div className='login__container'>
        <SignTitle text='Рады видеть!' />
        <SignInput name='E-mail' type='email' onChange={handleChange} isValid={useForm.errors.email}/>
        <SignInput name='Пароль' type='password' onChange={handleChange} isValid={useForm.errors.password}/>
      </div>
      <SignBottom errorMessage={errorMessage} buttonText='Войти' isValid={useForm.isValid} linkDescription='Ещё не зарегистрированы?' linkText='Регистрация' linkTo='signup'/>
    </form>
  );
}

export default Login;