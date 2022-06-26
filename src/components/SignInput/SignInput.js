import './SignInput.css';

function SignInput({ name, type, onChange, minLength, maxLength, pattern, isValid }) {
  return (
    <div className='sign-input'>
      <h2 className='sign-input__name'>{name}</h2>
      <input className={isValid === '' ? 'sign-input__input' : 'sign-input__input sign-input__input_type_error'} pattern={pattern} type={type} name={type} onChange={onChange} minLength={minLength}  maxLength={maxLength} required/>
      <span className='sign-input__error'>{isValid}</span>
    </div>
  );
}

export default SignInput;