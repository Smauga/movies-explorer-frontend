import { Link } from 'react-router-dom';

import './SignBottom.css';

function SignBottom({ buttonText, linkDescription, linkText, linkTo }) {
  return (
    <div className='sign-bottom'>
      <button className='sign-bottom__button' type='submit'>{buttonText}</button>
      <div className='sign-bottom__container'>
        <p className='sign-bottom__link-description'>{linkDescription}</p>
        <Link to={linkTo} className='sign-bottom__link' href='#'>{linkText}</Link>
      </div>
    </div>
  );
}

export default SignBottom;