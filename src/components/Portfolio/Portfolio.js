import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/Smauga/how-to-learn' target='_blank'>
            <p className='portfolio__item-name'>Статичный сайт</p>
            <img className='portfolio__item-arrow' src={arrow} alt='arrow'/>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/Smauga/russian-travel' target='_blank'>
            <p className='portfolio__item-name'>Адаптивный сайт</p>
            <img className='portfolio__item-arrow' src={arrow} alt='arrow'/>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/Smauga/react-mesto-api-full' target='_blank'>
            <p className='portfolio__item-name'>Одностраничное приложение</p>
            <img className='portfolio__item-arrow' src={arrow} alt='arrow'/>
          </a>
        </li>
      </ul>

    </section>
  );
}

export default Portfolio;