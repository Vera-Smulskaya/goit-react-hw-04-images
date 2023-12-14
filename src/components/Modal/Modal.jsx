import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ closeModal, image, alt }) => {
  useEffect(() => {
    const handleEsc = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  const overlayClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={overlayClick}>
      <div className={css.modal}>
        <img src={image} alt={alt} className={css.imageModal} />
      </div>
    </div>
  );
};

export default Modal;
