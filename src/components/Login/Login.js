import './Login.css';
import SignInput from "../SignInput/SignInput";
import SignTitle from "../SignTitle/SignTitle";
import SignBottom from "../SignBottom/SignBottom";

function Login() {
  return (
    <form className='login'>
      <div className='login__container'>
        <SignTitle text='Рады видеть!' />
        <SignInput name='E-mail' type='email'/>
        <SignInput name='Пароль' type='password'/>
      </div>
      <SignBottom buttonText='Войти'  linkDescription='Ещё не зарегистрированы?' linkText='Регистрация' linkTo='signup'/>
    </form>
  );
}

export default Login;