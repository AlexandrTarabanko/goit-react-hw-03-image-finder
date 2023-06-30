import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, handleOpenImg }) => {
  return (
    <ul className={css.galleryList}>
      {images.map(({ largeImage, smallImage, tags }, idx) => (
        <ImageGalleryItem
          key={idx}
          alt={tags}
          smallImg={smallImage}
          largeImg={largeImage}
          handleOpenImg={handleOpenImg}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  handleOpenImg: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      largeImage: PropTypes.string,
      smallImage: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
};
