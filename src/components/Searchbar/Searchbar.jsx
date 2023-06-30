import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onFormSubmit = e => {
    const { onSubmit } = this.props;
    const { query } = this.state;
    e.preventDefault();

    if (query.trim() === '') {
      Notiflix.Notify.failure('Invalid input, please try again');
      return;
    }

    this.reset();
    onSubmit(query);
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className={css.searchbar}>
        <form onSubmit={this.onFormSubmit} className={css.form}>
          <button type="submit" className={css.submitBtn}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}
