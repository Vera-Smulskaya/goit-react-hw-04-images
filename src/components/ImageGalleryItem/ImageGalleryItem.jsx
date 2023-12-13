import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, largeImageURL, tags, showModal } = this.props;

    return (
      <li
        onClick={() => showModal(largeImageURL, tags)}
        className={css.imageGalleryItem}
      >
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  }
}
