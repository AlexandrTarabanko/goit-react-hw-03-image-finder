import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className="gallery">
      {images.map(({ largeImage, smallImage, tags }, idx) => (
        <ImageGalleryItem
          key={idx}
          alt={tags}
          smallImg={smallImage}
          largeImg={largeImage}
        />
      ))}
    </ul>
  );
};
