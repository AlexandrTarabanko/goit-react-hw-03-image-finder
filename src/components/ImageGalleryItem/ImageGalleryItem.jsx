export const ImageGalleryItem = ({ alt, smallImg, largeImg }) => {
  return (
    <li className="gallery-item">
      <img src={smallImg} alt={alt} />
    </li>
  );
};
