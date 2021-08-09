import { memo } from 'react';
import Navigation from '../Navigation/Navigation';
import './Popup.css';

function Popup({ isOpen, onClose }) {
  const handleClose = (evt) => {
    if (evt.target.classList.contains('popup__close-button')
    || evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <div
      className={`popup${isOpen ? ' popup_opened' : ''}`}
      onClick={handleClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button button"
          type="button"
          onClick={handleClose}
        />
        <Navigation onClose={onClose} />
      </div>
    </div>
  )
}

export default memo(Popup);
