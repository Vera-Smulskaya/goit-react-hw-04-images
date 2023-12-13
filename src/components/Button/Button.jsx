import React, { Component } from 'react';
import css from './Button.module.css';

export default class Button extends Component {
  render() {
    const { children, onClick } = this.props;

    return (
      <button type="button" onClick={onClick} className={css.button}>
        {children}
      </button>
    );
  }
}
