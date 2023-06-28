import { Component } from 'react';

export class Searchbar extends Component {
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
      alert('Invalid input, please try again');
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
      <header className="searchbar">
        <form onSubmit={this.onFormSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
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
