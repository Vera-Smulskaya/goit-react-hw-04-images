import React, { Component } from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    const query = event.currentTarget.value;
    this.setState({ query: query });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      return Notiflix.Notify.warning('Please enter word for search');
    }

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className={css.buttonSearch}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.inputSearch}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.query}
            onChange={this.handleChange}
            name="search"
            placeholder="write your word"
          />
        </form>
      </header>
    );
  }
}
