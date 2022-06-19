import './SearchForm.css';

const handleShortsClick = () => {
  const shortsToggle = document.querySelector('.search-form__toggle');  
  shortsToggle.classList.toggle('search-form__toggle_active');
};

function SearchForm() {
  return (
    <form className="search-form">
     <div className='search-form__container'>
       <input className='search-form__input' type='text' placeholder='Фильм' required/>
       <button className='search-form__search-button' type='submit'></button>
     </div>
     <div className='search-form__shorts'>
       <p className='search-form__shorts-text'>Короткометражки</p>
       <input id='toggle-button' className='search-form__shorts-button' type='checkbox' onClick={handleShortsClick}/>
       <label htmlFor='toggle-button' className='search-form__toggle'>
         <div className='search-form__toggle-key'></div>
       </label>
     </div>
    </form>
  );
}

export default SearchForm;
