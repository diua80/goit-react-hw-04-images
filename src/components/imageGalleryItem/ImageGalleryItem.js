import { ImgModal } from 'components/modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ imageUrl, alt, imageLargeUrl }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
      <li className="ImageGalleryItem">
        <img
          src={imageUrl}
          alt={alt}
          onClick={openModal}
        />
        {isModalOpen && (
          <ImgModal
          imgLargeUrl={imageLargeUrl}
            alt={alt}
            isModalOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </li>
    );
}
