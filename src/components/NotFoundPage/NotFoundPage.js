import { Link } from 'react-router-dom';

import './NotFoundPage.css';

function NotFoundPage({ handleGoBack }) {
  return (
    <section className='not-found-page'>
      <div className='not-found-page__container'>
        <h2 className='not-found-page__title'>404</h2>
        <p className='not-found-page__text'>Страница не найдена</p>
      </div>
      <Link to='' className='not-found-page__back'>Назад</Link>
    </section>
  );
}

export default NotFoundPage;