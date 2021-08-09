import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css';

function Navigation({ onClose }) {
  const handleClose = (evt) => onClose();

  return (
    <nav className="navigation">
      <ul className="navigation-list navigation_hidden">
        <li className="navigation-item">
          <NavLink
            exact to="/"
            className="navigation__link navigation__link_mobile-only button"
            activeClassName="navigation__link_active"
            onClick={handleClose}
          >
            Главная
          </NavLink>
        </li>

        <li className="navigation-item">
          <NavLink
            to="/movies"
            className="navigation__link button"
            activeClassName="navigation__link_active"
            onClick={handleClose}
          >
            Фильмы
          </NavLink>
        </li>

        <li className="navigation-item">
          <NavLink
            to="/saved-movies"
            className="navigation__link button"
            activeClassName="navigation__link_active"
            onClick={handleClose}
          >
            Сохранённые фильмы
          </NavLink>
        </li>

        <li className="navigation-item">
          <NavLink
            to="/profile"
            className="navigation__link navigation__link_type_grayscale-button button"
            onClick={handleClose}
          >
            Аккаунт
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default memo(Navigation);
