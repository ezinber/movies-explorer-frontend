import { memo, useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useForm';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import './Profile.css';

function Profile({ onLogout, onSubmit }) {
  const [isEditing, setIsEditing] = useState(false);
  const { name, email } = useContext(CurrentUserContext);
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = useFormWithValidation();

  const {
    name: nameValue = name,
    email: emailValue = email,
  } = values;

  const {
    name: nameError = '',
    email: emailError = '',
  } = errors;

  const handleEdit = () => {
    isEditing && resetForm();
    setIsEditing(!isEditing);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit(nameValue, emailValue);
  }


  return (
    <main className={`profile${isEditing ? ' profile_type_edit' : ''}`}>
      {isEditing ? (
        <>
          <Form
            title="Внесите изменения"
            buttonName="Сохранить"
            onSubmit={handleSubmit}
            isValid={isValid && (nameValue !== name || emailValue !== email)}
          >
          <FormInput
            label="Имя"
            type="text"
            name="name"
            value={nameValue}
            error={nameError}
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            required={true}
          />
          <FormInput
            label="E-mail"
            type="email"
            name="email"
            value={emailValue}
            error={emailError}
            onChange={handleChange}
            required={true}
          />
          </Form>
          <button
            className="profile__button profile__button_type_edit button"
            onClick={handleEdit}
          >
            Назад
          </button>
        </>
      ) : (
        <>
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
              <button
                className="profile__button button"
                onClick={handleEdit}
              >
                Редактировать
              </button>
            </li>
            <li>
              <button
                className="profile__button profile__button_type_colorful button"
                onClick={onLogout}
              >
                Выйти из профиля
              </button>
            </li>
          </ul>
        </>
      )
    }
    </main>
  )
}

export default memo(Profile);
