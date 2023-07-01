import { Oval } from 'react-loader-spinner';
import css from './App.module.css';
import { Component } from 'react';
import { getImages } from 'api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    isLoading: false,
    error: false,
    images: [],
    totalImg: null,
    showModal: false,
    modalImgSrc: null,
    modalImgAlt: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.onFetch(query);
    }

    if (prevState.page !== page && page !== 1) {
      this.onFetch(query, page);
    }
  }

  onFetch = (query, page) => {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading });

    getImages(query, page)
      .then(({ hits, totalHits }) => {
        let imagesArr = hits.map(image => ({
          tags: image.tags,
          smallImage: image.webformatURL,
          largeImage: image.largeImageURL,
        }));

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...imagesArr],
            totalImg: totalHits,
          };
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
      );
  };

  onSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  onPagination = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleOpenImg = e => {
    const targetImgSrc = e.target.id;
    const targetImgAlt = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        modalImgSrc: targetImgSrc,
        modalImgAlt: targetImgAlt,
      }));
    }
  };

  render() {
    const { images, totalImg, isLoading, showModal, modalImgSrc, modalImgAlt } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {images && (
          <ImageGallery images={images} handleOpenImg={this.handleOpenImg} />
        )}
        {images.length >= 12 && totalImg > images.length && (
          <Button isLoading={isLoading} onPagination={this.onPagination} />
        )}
        {isLoading && (
          <Oval
            height={200}
            width={200}
            color="#FFD700"
            wrapperStyle={{}}
            wrapperClass={css.loader}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#0000FF"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
        {showModal && (
          <Modal
            toggleModal={this.toggleModal}
            modalImgSrc={modalImgSrc}
            modalImgAlt={modalImgAlt}
          />
        )}
      </>
    );
  }
}
