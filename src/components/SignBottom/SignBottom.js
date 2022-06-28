import './SignBottom.css';

import { Link } from 'react-router-dom';

function SignBottom({ buttonsIsBlocked, buttonText, linkDescription, linkText, linkTo, isValid, errorMessage }) {
  return (
    <div className='sign-bottom'>
      <p className='sign-bottom__error-message'>{errorMessage}</p>
      <button
        className={isValid && !buttonsIsBlocked ? 'sign-bottom__button' : 'sign-bottom__button sign-bottom__button_disabled'}
        type='submit' disabled={!isValid || buttonsIsBlocked}>
          {buttonText}
        </button>
      <div className='sign-bottom__container'>
        <p className='sign-bottom__link-description'>{linkDescription}</p>
        <Link
          to={linkTo}
          className={buttonsIsBlocked ?
            'sign-bottom__link sign-bottom__link_disabled' :
            'sign-bottom__link'}
          href='#'>
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default SignBottom;