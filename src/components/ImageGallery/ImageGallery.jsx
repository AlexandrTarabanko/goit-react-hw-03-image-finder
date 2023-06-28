import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className="gallery">
      {images.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          alt={tags}
          smallImg={webformatURL}
          largeImg={largeImageURL}
        />
      ))}
    </ul>
  );
};
