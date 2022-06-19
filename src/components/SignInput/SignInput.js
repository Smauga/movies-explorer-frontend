import './SignInput.css';

function SignInput({ name, type }) {
  return (
    <div className='sign-input'>
      <h2 className='sign-input__name'>{name}</h2>
      <input className={`sign-input__input sign-input___input_type_${type}`} type='text' required/>
      <span className='sign-input__error sign-input__error_visible'></span>
    </div>
  );
}

export default SignInput;