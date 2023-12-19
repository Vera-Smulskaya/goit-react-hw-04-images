import { useState } from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    const query = event.currentTarget.value;
    setQuery(query);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return Notiflix.Notify.warning('Please enter word for search');
    }
    onSubmit({ query });
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className={css.buttonSearch}>
          <span className="button-label">Search</span>
        </button>

        <input
          className={css.inputSearch}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={handleChange}
          name="search"
          placeholder="write your word"
        />
      </form>
    </header>
  );
};

export default Searchbar;
