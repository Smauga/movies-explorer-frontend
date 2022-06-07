import './NavTab.css';

function NavTab() {
  return (
    <nav>
      <ul className='nav-tab'>
        <li><a className='nav-tab__link' href='#'>О проекте</a></li>
        <li><a className='nav-tab__link' href='#'>Технологии</a></li>
        <li><a className='nav-tab__link' href='#'>Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;