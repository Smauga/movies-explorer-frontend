import './Profile.css';

const edit = false;

function Profile() {
  return (
    <form className='profile'>
      <div className='profile__container'>
        <h2 className='profile__welcome'>Привет, Виталий!</h2>
        <div className='profile__input-container'>
          <label className='profile__input-label' htmlFor='name'>Имя</label>
          <input className='profile__input profile__input_type_name' type='text' id='name' value='Виталий' required/>
        </div>
        <div className='profile__input-container'>
          <label className='profile__input-label' htmlFor='email'>E-mail</label>
          <input className='profile__input profile__input_type_email' type='text' id='email' value='pochta@yandex.ru' required/>
        </div>
      </div>
        <div className='profile__buttons'>
        { edit ?
          <>
            <p className='profile__error-message'>При обновлении профиля произошла ошибка.</p>
            <button className='profile__button-edit profile__button-edit_disabled' disabled type='submit'>Сохранить</button> 
          </> :
          <>
            <button className='profile__button' type='button'>Редактировать</button>
            <button className='profile__button profile__button_color_red' type='button'>Выйти из аккаунта</button>
          </>
        }
      </div>
    </form>
  );
}

export default Profile;