import { memo } from 'react';
import TimeLine from '../TimeLine/TimeLine';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="main__section-title">
        О проекте
      </h2>
      <div className="about-project__articles-wrapper">
        <article className="about-project__article">
          <h3 className="about-project__article-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__article-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </article>
        <article className="about-project__article">
          <h3 className="about-project__article-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__article-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <TimeLine />
    </section>
  )
}

export default memo(AboutProject);