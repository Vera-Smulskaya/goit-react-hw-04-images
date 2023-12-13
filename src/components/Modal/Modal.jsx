import React, { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  overlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.overlayClick}>
        <div className={css.modal}>
          <img
            src={this.props.image}
            alt={this.props.alt}
            className={css.imageModal}
          />
        </div>
      </div>
    );
  }
}
