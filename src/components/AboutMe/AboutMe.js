import './AboutMe.css';
import myPhoto from '../../images/my-photo.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Никита</h3>
          <p className='about-me__about'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <div className='about-me__contacts'>
            <a className='about-me__link' href='#'>Вконтакте</a>
            <a className='about-me__link' href='#'>Github</a>
          </div>
        </div>
        <div className='about-me__image-container'>
          <img className='about-me__image' src={myPhoto} alt='Мое фото' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;