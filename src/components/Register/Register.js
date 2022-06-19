import './Register.css';
import SignInput from "../SignInput/SignInput";
import SignTitle from "../SignTitle/SignTitle";
import SignBottom from "../SignBottom/SignBottom";

function Register() {
  return (
    <form className='register'>
      <div className='register__container'>
        <SignTitle text='Добро пожаловать!' />
        <SignInput name='Имя' type='name'/>
        <SignInput name='E-mail' type='email'/>
        <SignInput name='Пароль' type='password'/>
      </div>
      <SignBottom buttonText='Зарегистрироваться'  linkDescription='Уже зарегистрированы?' linkText='Войти' linkTo='signin' />
    </form>
  );
}

export default Register;