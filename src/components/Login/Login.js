import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Login.css';

function Login() {
  return (
    <div className="login">
      <div className="login__logo-wrapper">
        <Logo />
      </div>

      <Form title="Рады видеть!" buttonName="Войти">
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
        <input className="form__input" type="password" required />
        <span className="form__input-label form__input-label_type_error">
          Error
        </span>
      </Form>

      <p className="login__question">
        <span className="login__question">
          Ещё не зарегистрированы?&nbsp;
          <NavLink className="login__link button" to="/register">
            Регистрация
          </NavLink>
        </span>
      </p>
    </div>
  )
}

export default memo(Login);
