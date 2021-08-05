import { memo } from 'react';
import './Form.css';

function Form({ children, title, buttonName, onSubmit }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="form__title">
        {title}
      </h1>

      {children}

      <button className="form__submit-button button" type="submit">
        {buttonName}
      </button>
    </form>
  )
}

export default memo(Form);
