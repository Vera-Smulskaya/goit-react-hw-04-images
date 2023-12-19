import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, showModal }) => {
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
};

export default ImageGallery;
