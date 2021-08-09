import { memo } from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__about">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <p className="footer__copyright">
        © 2021
      </p>
      <nav>
        <ul className="footer__links">
          <li>
            <a
              className="footer__link button"
              href="https://praktikum.yandex.ru"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link button"
              href="https://github.com/ezinber"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default memo(Footer);
