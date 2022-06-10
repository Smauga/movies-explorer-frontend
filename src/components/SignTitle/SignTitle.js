import { Link } from 'react-router-dom';

import './SignTitle.css';

function SignTitle({ text }) {
  return (
    <div className='sign-title'>
      <Link to='' className='sign-title__logo'></Link>
      <h2 className='sign-title__text'>{text}</h2>
    </div>
  );
}

export default SignTitle;