import PropTypes from 'prop-types';

export const Button = ({ onPagination, isLoading }) => {
  return (
    <button disabled={isLoading} type="button" onClick={onPagination}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onPagination: PropTypes.func.isRequired,
};
