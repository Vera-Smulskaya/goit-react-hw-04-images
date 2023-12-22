import { fetchPhoto } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import css from './App.module.css';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { useEffect, useState } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchImages, setSearchImages] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState([]);
  const [imageTags, setImageTags] = useState('');
  const [lastSearchQuery] = useState('');

  useEffect(() => {
    if (!searchImages) {
      return;
    }
    setIsLoading(true);
    fetchImages(searchImages, page);
  }, [searchImages, page]);

  const fetchImages = async (query, page) => {
    setIsLoading(true);

    try {
      await fetchPhoto(query, page).then(result => {
        const images = result.data.hits;
        const lastImages = result.data.totalHits - 12 * page;

        if (images.length === 0) {
          setShowLoadMore(false);
          Notiflix.Notify.failure(
            'Sorry, there are no images. Please try again.'
          );
          return;
        } else {
          setImages(prevState => [...prevState, ...images]);
        }
        setShowLoadMore(lastImages > 0);
      });
    } catch (error) {
      Notiflix.Notify.info(' Sorry, some error occured.');
    } finally {
      setIsLoading(false);
    }
  };

  const onLoadMore = () => {
    const nextPage = page + 1;

    setPage(nextPage);
  };

  const toggleModal = (largeImageURL, imageTags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setImageTags(imageTags);
  };

  const onSubmit = formData => {
    const { query } = formData;

    if (query !== lastSearchQuery) {
      setSearchImages(query);
      setPage(1);
      setImages([]);
    } else {
      Notiflix.Notify.info(`Sorry! You are already looking for ${query}`);
    }
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} showModal={toggleModal} />
      {showLoadMore && <Button onClick={onLoadMore}>Load more</Button>}
      {showModal && (
        <Modal closeModal={toggleModal} alt={imageTags} image={largeImageURL} />
      )}
    </div>
  );
};
