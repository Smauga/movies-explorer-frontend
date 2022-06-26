import './Profile.css';

import { useState, useEffect, useContext } from 'react';
import { CurrentUser } from '../../contexts/CurrentUserContext';

function Profile({ onClickSignout, onClickEditProfile }) {
  
  const user = useContext(CurrentUser);
  const [editProfile, setEditProfile] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  function handleEditClick() {
    setEditProfile(true)
  }

  function handleChange(e) {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    setIsValid(e.target.closest("form").checkValidity());
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onClickEditProfile(name, email)
    .then(() => {
      setEditProfile(false)
      setMessage('');
    })
      .catch((error) => {
        error.status ===  409 ? 
        setMessage('Пользователь с таким email уже существует.') : 
        setMessage('При обновлении профиля произошла ошибка.');
      });

  }

  return (
    <form className='profile' onSubmit={handleSubmit}>
      <div className={editProfile ? 'profile__container profile__container_enabled' : 'profile__container'}>
        <h2 className='profile__welcome'>Привет, {user.name}!</h2>
        <div className='profile__input-container'>
          <label className='profile__input-label' htmlFor='name'>Имя</label>
          <input 
            className='profile__input profile__input_type_name'
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
          className='profile__input profile__input_type_email'
          type='email'
          name='email'
          value={email || ''}
          onChange={handleChange}
          required></input>
        </div>
      </div>
        <div className='profile__buttons'>
        { 
        editProfile ?
          <>
            <p className='profile__error-message'>{message}</p>
            <button className={!isValid || (name === user.name && email === user.email) ? 'profile__button-edit profile__button-edit_disabled': 'profile__button-edit'} type='submit'>Сохранить</button> 
          </> :
          <>
            <button className='profile__button' type='button' onClick={handleEditClick} >Редактировать</button>
            <button className='profile__button profile__button_color_red' type='button' onClick={onClickSignout}>Выйти из аккаунта</button>
          </>
        }
      </div>
    </form>
  );
}

export default Profile;