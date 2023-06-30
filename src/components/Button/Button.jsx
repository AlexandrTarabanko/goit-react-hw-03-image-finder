import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onPagination, isLoading }) => {
  return (
    <button
      className={css.loadBtn}
      disabled={isLoading}
      type="button"
      onClick={onPagination}
    >
      Load More
    </button>
  );
};

Button.propTypes = {
  onPagination: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
