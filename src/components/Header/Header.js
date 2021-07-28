import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../Logo/Logo';

import './Header.css';

function Header({ isLoggedIn }) {
  isLoggedIn = false;
  return (
    <header className="header">
      <Logo />

      {isLoggedIn ? (
        <>
          <button className="header__button button" type="button" />
          <nav>
            <ul className="header__menu">
              <li>
                <NavLink
                  to="/"
                  className="header__link header__link_mobile-only button"
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies"
                  className="header__link button"
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/saved-movies"
                  className="header__link button"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className="header__link header__link_type_grayscale-button button"
                >
                  Аккаунт
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <ul className="header__menu">
          <li>
            <NavLink
              to="/register"
              className="header__link button"
            >
              Регистрация
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="header__link header__link_type_colorful-button button"
            >
              Войти
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  )
}

export default memo(Header);