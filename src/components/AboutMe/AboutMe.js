import { memo } from 'react';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';
import photo from '../../images/photo.jpg'

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="main__section-title">
        Студент
      </h2>
      <article className="about-me__card">
        <img className="about-me__photo" src={photo} alt="Михаил, фронтенд-разработчик" />
        <h3 className="about-me__name">
          Михаил
        </h3>
        <p className="about-me__info">
          Фронтенд-разработчик, 31 год
        </p>
        <p className="about-me__description">
          Я родился и живу в Москве, где получил высшее юридическое образование. Занимаюсь волонтёрством, изготовлением тактического снаряжения, увлекаюсь страйкболом. Люблю работать в слаженной команде, но готов и к самостоятельной работе. Закончил курс веб-разработки, свободное время посвящаю оттачиванию навыков и работе над пет-проектами.
        </p>
        <a
          className="about-me__link button"
          href="https://github.com/ezinber"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </article>

      <Portfolio />

    </section>
  )
}

export default memo(AboutMe);
