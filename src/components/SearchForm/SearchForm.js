import './SearchForm.css';

import { useState, useRef, useEffect } from 'react';

function SearchForm({ onSearchClick, savedShortMoviesCheckbox, savedEnteredSearchText, isPageSavedMovies }) {

  const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false);
  const [enteredSearchText, setEnteredSearchText] = useState('');
  const searchRef = useRef();

  // Установка сохраненных значений поиска при их наличии
  useEffect(() => {
    setShortMoviesCheckbox(savedShortMoviesCheckbox === 'true');
    setEnteredSearchText(savedEnteredSearchText);
    searchRef.current.value = savedEnteredSearchText || '';
   }, []);

  // Изменить состояние чекбокса Короткометражки (при уже отправленном тексте выполнить поиск)
  function handleShortMoviesCheckbox() {
    if(savedEnteredSearchText) onSearchClick(savedEnteredSearchText, !shortMoviesCheckbox, false);
    setShortMoviesCheckbox(!shortMoviesCheckbox);
  };

  // Изменить инпут
  function handleChange(e) {setEnteredSearchText(e.target.value)}

  // Выполнить поиск
  function handleSubmit(e) {
    e.preventDefault();
    onSearchClick(enteredSearchText, shortMoviesCheckbox, isPageSavedMovies);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className='search-form__container'>
        <input
          autoComplete='off'
          className='search-form__input'
          type='text'
          placeholder='Фильм'
          onChange={handleChange}
          ref={searchRef}
          required />
        <button className={!enteredSearchText ?
          'search-form__search-button' :
          'search-form__search-button search-form__search-button_enabled'}
          type='submit'
          disabled={!enteredSearchText} />
      </div>
      <div className='search-form__shorts'>
        <p className='search-form__shorts-text'>Короткометражки</p>
        <input
          id='toggle-button'
          className='search-form__shorts-button'
          type='checkbox'
          onClick={handleShortMoviesCheckbox}/>
        <label
          htmlFor='toggle-button'
          className={ shortMoviesCheckbox ?
            'search-form__toggle search-form__toggle_active' :
            'search-form__toggle'}>
          <div className='search-form__toggle-key'></div>
        </label>
      </div>
    </form>
  );
}

export default SearchForm;
