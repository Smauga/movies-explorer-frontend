import './AboutMe.css';
import myPhoto from '../../images/my-photo.jpg';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Никита</h3>
          <p className='about-me__about'>Фронтенд-разработчик, 23 года</p>
          <p className='about-me__text'>Я родился в небольшом поселке Верх-Обском, живу в Барнауле.
            Закончил АлтГТУ по направлению "Информационная безопасность". Во время обучения в ВУЗе
            вскользь затрагивали тему веб-разработки. После этого я захотел узнать об этом подробнее и
            прошел курс по данному направлению.
            По будущей профессии еще не работал, но стремлюсь к этому.
          </p>
          <div className='about-me__contacts'>
            <a className='about-me__link' href='https://t.me/nsmagins' target='_blank'>Telegram</a>
            <a className='about-me__link' href='https://github.com/Smauga' target='_blank'>Github</a>
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