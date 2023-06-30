import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    modalImgSrc: PropTypes.string,
    modalImgAlt: PropTypes.string,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  onEscape = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  onBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { modalImgAlt, modalImgSrc } = this.props;
    return createPortal(
      <div onClick={this.onBackdrop} className={css.backdrop}>
        <div className={css.modal}>
          <img
            className={css.modalImg}
            loading="lazy"
            src={modalImgSrc}
            alt={modalImgAlt}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
