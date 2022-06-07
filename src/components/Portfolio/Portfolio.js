import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='#'>
            <p className='portfolio__item-name'>Статичный сайт</p>
            <img className='portfolio__item-arrow' src={arrow}/>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='#'>
            <p className='portfolio__item-name'>Адаптивный сайт</p>
            <img className='portfolio__item-arrow' src={arrow}/>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='#'>
            <p className='portfolio__item-name'>Одностраничное приложение</p>
            <img className='portfolio__item-arrow' src={arrow}/>
          </a>
        </li>
      </ul>

    </section>
  );
}

export default Portfolio;