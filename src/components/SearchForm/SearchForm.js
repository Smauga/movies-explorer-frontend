import './SearchForm.css';

import { useState, useRef, useEffect } from 'react';

function SearchForm({ onSearchClick, savedShortFilms, savedSearch, savedSection }) {

  const [shortFilms, setShortFilms] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    setShortFilms(savedShortFilms === 'true');
    setSearch(savedSearch);
    searchRef.current.value = savedSearch || '';
   }, []);

  function handleShortsClick() {
    if(savedSearch) onSearchClick(savedSearch, !shortFilms);
    setShortFilms(!shortFilms);
  };

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearchClick(search, shortFilms, savedSection);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
     <div className='search-form__container'>
       <input
        className='search-form__input'
        type='text'
        placeholder='Фильм'
        onChange={handleChange}
        ref={searchRef}
        required />
       <button className='search-form__search-button' type='submit'></button>
     </div>
     <div className='search-form__shorts'>
       <p className='search-form__shorts-text'>Короткометражки</p>
       <input
       id='toggle-button'
       className='search-form__shorts-button'
       type='checkbox'
       onClick={handleShortsClick}/>
       <label
        htmlFor='toggle-button'
        className={ shortFilms ? 'search-form__toggle search-form__toggle_active' : 'search-form__toggle'}>
         <div className='search-form__toggle-key'></div>
       </label>
     </div>
    </form>
  );
}

export default SearchForm;
