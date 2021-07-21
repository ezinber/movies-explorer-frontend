import { memo } from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <nav>
      <ul className="navtab">
        <li>
          <Link to="/#about-project" className="navtab__link button">
            О проекте
          </Link>
        </li>
        <li>
          <Link to="/#techs" className="navtab__link button">
            Технологии
          </Link>
        </li>
        <li>
          <Link to="/#about-me" className="navtab__link button">
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default memo(NavTab);
