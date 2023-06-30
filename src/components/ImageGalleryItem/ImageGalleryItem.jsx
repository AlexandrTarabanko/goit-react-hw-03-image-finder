import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  alt,
  smallImg,
  largeImg,
  handleOpenImg,
}) => {
  return (
    <li onClick={handleOpenImg} className={css.galletyItem}>
      <img className={css.galleryImg} src={smallImg} alt={alt} id={largeImg} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  alt: PropTypes.string,
  smallImage: PropTypes.string,
  largeImage: PropTypes.string,
  handleOpenImg: PropTypes.func.isRequired,
};
