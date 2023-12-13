import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const { images, showModal } = this.props;

    return (
      <ul className={css.imageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.largeImageURL}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            showModal={showModal}
          />
        ))}
      </ul>
    );
  }
}
