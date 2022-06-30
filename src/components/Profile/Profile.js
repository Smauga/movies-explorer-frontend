import './Profile.css';

import { useState, useEffect, useContext } from 'react';
import { CurrentUser } from '../../contexts/CurrentUserContext';
import { profileUpdateSussessMesssage, profileUpdateConflictMesssage, profileUpdateServerMesssage } from '../../utils/constants';

function Profile({ onClickSignout, onClickEditProfile }) {
  
  const user = useContext(CurrentUser);

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [buttonIsBlocked, setButtonIsBlocked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  function handleEditClick() {
    setIsEditProfile(true);
    setMessage({});
  }

  function handleChange(e) {
    if (e.target.name === 'name') setName(e.target.value);
    if (e.target.name === 'email') setEmail(e.target.value);
    setIsValid(e.target.closest('form').checkValidity());
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    setButtonIsBlocked(true);
    onClickEditProfile(name, email)
      .then(() => {
        setIsEditProfile(false)
        setMessage('');
        setMessage({ error: false, text: profileUpdateSussessMesssage});
      })
      .catch((error) => {
        error ===  409 ? 
        setMessage({ error: true, text: profileUpdateConflictMesssage}) : 
        setMessage({ error: true, text: profileUpdateServerMesssage});
      })
      .finally(() => setButtonIsBlocked(false));
  }

  return (
    <form className='profile' onSubmit={handleSubmit}>
      <div className={isEditProfile ? 'profile__container profile__container_enabled' : 'profile__container'}>
        <h2 className='profile__welcome'>Привет, {user.name}!</h2>
        <div className='profile__input-container'>
          <label className='profile__input-label' htmlFor='name'>Имя</label>
          <input 
            className='profile__input'
            autoComplete='off'
            type='text'
            name='name'
            value={name || ''}
            onChange={handleChange}
            minLength='2'
            maxLength='30'
            required/>
        </div>
        <div className='profile__input-container'>
          <label className='profile__input-label' htmlFor='email'>E-mail</label>
          <input
          className='profile__input'
            autoComplete='off'
            type='email'
            name='email'
            pattern='(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            value={email || ''}
            onChange={handleChange}
            required/>
        </div>
      </div>
        <div className='profile__buttons'>
        <p className={message.error ? 'profile__message profile__message_type_error' : 'profile__message'}>{message.text}</p>
        { isEditProfile ?
          <button
            className={!isValid || (name === user.name && email === user.email) || buttonIsBlocked ?
              'profile__button-edit profile__button-edit_disabled':
              'profile__button-edit'}
            type='submit'
            disabled={!isValid || (name === user.name && email === user.email) || buttonIsBlocked}>
              Сохранить
            </button> :
          <>
            <button
              className='profile__button'
              type='button'
              onClick={handleEditClick}>
                Редактировать
              </button>
            <button
              className='profile__button profile__button_color_red'
              type='button'
              onClick={onClickSignout}>
                Выйти из аккаунта
              </button>
          </>
        }
      </div>
    </form>
  );
}

export default Profile;