import { Component } from 'react';
import { getImages } from 'api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    isLoading: false,
    error: false,
    images: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, isLoading } = this.state;

    if (prevState.query !== query) {
      this.setState({ isLoading: !isLoading });

      getImages(query)
        .then(res => {
          const imagesArr = res.map(image => ({
            id: image.id,
            description: image.tags,
            smallImage: image.webformatURL,
            largeImage: image.largeImageURL,
          }));

          return this.setState({ page: 1, images: imagesArr });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  onSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { images } = this.state;

    return (
      <>
        {/* <button onClick={getImages('dog')}></button> */}
        <Searchbar onSubmit={this.onSubmit} />
        {images && <ImageGallery images={images} />}
      </>
    );
  }
}
