import React, { Component } from 'react';
import { fetchPhoto } from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import css from './App.module.css';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
export class App extends Component {
  state = {
    images: [],
    page: 1,
    searchImages: '',
    isLoading: false,
    showLoadMore: false,
    showModal: false,
    largeImageURL: [],
    imageTags: '',
    error: null,
    lastSearchQuery: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchImages !== prevState.searchImages ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      this.fetchImages(this.state.searchImages, this.state.page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      await fetchPhoto(query, page).then(result => {
        const images = result.data.hits;
        const lastImages = result.data.totalHits - 12 * this.state.page;

        if (images.length === 0) {
          this.setState({ showLoadMore: false });
          Notiflix.Notify.failure(
            'Sorry, there are no images. Please try again.'
          );
          return;
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
          }));
        }
        lastImages > 0
          ? this.setState({ showLoadMore: true })
          : this.setState({ showLoadMore: false });
      });
    } catch (error) {
      Notiflix.Notify.info(' Sorry, some error occured.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = (largeImageURL, imageTags) => {
    this.setState(state => ({
      showModal: !state.showModal,
      largeImageURL: largeImageURL,
      imageTags: imageTags,
    }));
  };

  onSubmit = FormData => {
    const { query } = FormData;

    if (query !== this.state.lastSearchQuery) {
      this.setState({
        searchImages: query,
        page: 1,
        images: [],
        lastSearchQuery: query,
      });
    } else {
      Notiflix.Notify.info(`Sorry! You are already looking for ${query}`);
    }
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.error !== null && (
          <p className={css.errorBage}>
            Sorry, some error occured. Error message: {this.state.error}
          </p>
        )}
        {this.state.isLoading && <Loader />}
        <ImageGallery images={this.state.images} showModal={this.toggleModal} />
        {this.state.showLoadMore && (
          <Button onClick={this.onLoadMore}>Load more</Button>
        )}
        {this.state.showModal && (
          <Modal
            closeModal={this.toggleModal}
            alt={this.state.imageTags}
            image={this.state.largeImageURL}
          />
        )}
      </div>
    );
  }
}
