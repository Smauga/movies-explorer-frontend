import './SignInput.css';

function SignInput({ label, name, type, onChange, minLength, maxLength, pattern, isValid }) {
  return (
    <div className='sign-input'>
      <label className='sign-input__name' htmlFor={name}>{label}</label>
      <input
        className={isValid === '' ? 'sign-input__input' : 'sign-input__input sign-input__input_type_error'}
        autoComplete='off'
        pattern={pattern}
        type={type}
        name={name}
        onChange={onChange}
        minLength={minLength} 
        maxLength={maxLength}
        required />
      <span className='sign-input__error'>{isValid}</span>
    </div>
  );
}

export default SignInput;