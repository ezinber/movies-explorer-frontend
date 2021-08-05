import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Register.css';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    e.target.name === 'name' && setName(e.target.value);
    e.target.name === 'email' && setEmail(e.target.value);
    e.target.name === 'password' && setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister(name, email, password);
  }

  return (
    <div className="register">
      <div className="register__logo-wrapper">
        <Logo />
      </div>

      <Form
        title="Добро пожаловать!"
        buttonName="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <span className="form__input-label">
          Имя
        </span>
        <input
          className="form__input"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__input-label form__input-label_type_error">
          Error
        </span>

        <span className="form__input-label">
          E-mail
        </span>
        <input
          className="form__input"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <span className="form__input-label form__input-label_type_error">
          Error
        </span>

        <span className="form__input-label">
          Пароль
        </span>
        <input
          className="form__input"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          minLength="8"
          required
        />
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
