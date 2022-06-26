import './NotFoundPage.css';

function NotFoundPage({ handleGoBack }) {
  return (
    <section className='not-found-page'>
      <div className='not-found-page__container'>
        <h2 className='not-found-page__title'>404</h2>
        <p className='not-found-page__text'>Страница не найдена</p>
      </div>
      <button className='not-found-page__back' type='button' onClick={handleGoBack}>Назад</button>
    </section>
  );
}

export default NotFoundPage;