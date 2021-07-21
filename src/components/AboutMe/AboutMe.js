import { memo } from 'react';
import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="main__section-title">
        Студент
      </h2>
      <article className="about-me__card">
        <img className="about-me__photo" src="https://picsum.photos/300/400" alt="me" />
        <h3 className="about-me__name">
          Михаил
        </h3>
        <p className="about-me__info">
          Фронтенд-разработчик, 30 лет
        </p>
        <p className="about-me__description">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
          С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <Link className="about-me__link button" to="github.ru">
          Github
        </Link>
      </article>

      <Portfolio />

    </section>
  )
}

export default memo(AboutMe);
