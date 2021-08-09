import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Register.css';

function Register() {
  return (
    <div className="register">
      <div className="register__logo-wrapper">
        <Logo />
      </div>

      <Form title="Добро пожаловать!" buttonName="Зарегистрироваться">
        <span className="form__input-label">
          Имя
        </span>
        <input className="form__input" type="text" minLength="2" maxLength="30" required />
        <span className="form__input-label form__input-label_type_error">
          Error
        </span>

        <span className="form__input-label">
          E-mail
        </span>
        <input className="form__input" type="email" required />
        <span className="form__input-label form__input-label_type_error">
          Error
        </span>

        <span className="form__input-label">
          Пароль
        </span>
        <input className="form__input" type="password" minLength="8" required />
        <span className="form__input-label form__input-label_type_error">
          Error
        </span>
      </Form>

      <p className="register__question">
        <span className="register__question">
          Уже зарегистрированы?&nbsp;
          <NavLink className="register__link button" to="/login">
            Войти
          </NavLink>
        </span>
      </p>
    </div>
  )
}

export default memo(Register);
