import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__top'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__bottom'>
        <p className='footer__date'>&copy; 2022</p>
        <div className='footer__links'>
          <a className='footer__link' href='#'>Яндекс.Практикум</a>
          <a className='footer__link' href='#'>Github</a>
          <a className='footer__link' href='#'>Facebook</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;