import { Oval } from 'react-loader-spinner';
import { Component } from 'react';
import { getImages } from 'api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    isLoading: false,
    error: false,
    images: [],
    totalImg: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, isLoading, page } = this.state;

    if (prevState.query !== query) {
      this.setState({ isLoading: !isLoading });

      setTimeout(() => {
        getImages(query)
          .then(({ hits, totalHits }) => {
            const imagesArr = hits.map(image => ({
              tags: image.tags,
              smallImage: image.webformatURL,
              largeImage: image.largeImageURL,
            }));

            return this.setState({
              page: 1,
              images: imagesArr,
              totalImg: totalHits,
            });
          })
          .catch(error => this.setState({ error }))
          .finally(() =>
            this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
          );
      }, 5000);
    }

    if (prevState.page !== page && prevState.page !== 1) {
      this.setState({ isLoading: !isLoading });

      setTimeout(() => {
        getImages(query, page)
          .then(({ hits }) => {
            const imagesArr = hits.map(image => ({
              tags: image.tags,
              smallImage: image.webformatURL,
              largeImage: image.largeImageURL,
            }));

            this.setState(prevState => {
              return {
                images: [...prevState.images, ...imagesArr],
              };
            });
          })
          .catch(error => this.setState({ error }))
          .finally(() =>
            this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
          );
      }, 5000);
    }
  }

  onSubmit = query => {
    this.setState({ query });
  };

  onPagination = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, totalImg, isLoading } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {images && <ImageGallery images={images} />}
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
      </>
    );
  }
}
