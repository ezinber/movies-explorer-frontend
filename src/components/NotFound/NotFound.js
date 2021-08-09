import { memo } from 'react';
import { useHistory } from 'react-router';
import './NotFound.css';

function NotFound() {
  const history = useHistory();

  return (
    <div className="not-found">
      <h1 className="not-found__title">
        404
      </h1>
      <p className="not-found__subtitle">
        Страница не найдена
      </p>
      <button
        className="not-found__back-button button"
        type="button"
        onClick={() => history.goBack()}>
        Назад
      </button>
    </div>
  )
}

export default memo(NotFound);
