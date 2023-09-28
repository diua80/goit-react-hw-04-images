import { ImgModal } from 'components/modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ imageUrl, alt, imageLargeUrl }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleOpenModal = () => setIsModalOpen (prevState => !prevState)

  return (
      <li className="ImageGalleryItem">
        <img
          src={imageUrl}
          alt={alt}
          onClick={toggleOpenModal}
        />
        {isModalOpen && (
          <ImgModal
          imgLargeUrl={imageLargeUrl}
            alt={alt}
            isModalOpen={isModalOpen}
            onClose={toggleOpenModal}
          />
        )}
      </li>
    );
}
