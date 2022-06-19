import { Link } from 'react-router-dom';

import './SignBottom.css';

function SignBottom({ buttonText, buttonOnSubmit, linkDescription, linkText, linkTo}) {
  return (
    <div className='sign-bottom'>
      <button className='sign-bottom__button' type='submit' onSubmit={buttonOnSubmit}>{buttonText}</button>
      <div className='sign-bottom__container'>
        <p className='sign-bottom__link-description'>{linkDescription}</p>
        <Link to={linkTo} className='sign-bottom__link' href='#'>{linkText}</Link>
      </div>
    </div>
  );
}

export default SignBottom;