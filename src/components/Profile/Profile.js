import { memo } from 'react';
import './Profile.css';

function Profile() {
  const name = 'Пользователь';
  const email = 'pocta@yandex.ru';

  return (
    <section className="profile">
      <h1 className="profile__greetings">
        {`Привет, ${name}!`}
      </h1>
      <ul className="profile__info">
        <li className="profile__info-wrapper">
          <p className="profile__info-element profile__info-element_type_bold">
            Имя
          </p>
          <p className="profile__info-element">
            {name}
          </p>
        </li>
        <li className="profile__info-wrapper profile__info-wrapper_type_bottom">
          <p className="profile__info-element profile__info-element_type_bold">
            E-mail
          </p>
          <p className="profile__info-element">
            {email}
          </p>
        </li>
      </ul>
      <ul className="profile__buttons">
        <li>
          <button className="profile__button button">
            Редактировать
          </button>
        </li>
        <li>
          <button className="profile__button profile__button_type_colorful button">
            Выйти из профиля
          </button>
        </li>
      </ul>
    </section>
  )
}

export default memo(Profile);
