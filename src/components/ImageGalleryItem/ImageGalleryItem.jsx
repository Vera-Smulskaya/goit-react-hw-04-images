import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, showModal }) => {
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
};

export default ImageGalleryItem;
