import { SearchBar } from './searchBar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { getImages } from '../api';
import { Button } from './button/Button';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImgCount, setLoadedImgCount] = useState(0);
  const [randomId, setRandomId] = useState(0);

const handleQueryChange = newQuery => {
  setQuery(newQuery);
  setImages([]);
  setPage(1);
  setRandomId(nanoid());
  }

  useEffect(() => {
    if (query === "") return;
    fetchedImages();
    async function fetchedImages() {
      try {
        setIsLoading(true);
        const result = query.slice(query.indexOf('/') + 1);
        const data = await getImages(result, page);
        setImages([...images, ...data.hits]);
        setLoadedImgCount(Math.ceil(data.totalHits / 12));
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [page, query, randomId]);

  const handleLoadMore = () => {
    setPage(prevState => (prevState + 1));
  };

  return (
    <div>
      <div>
        <SearchBar onHandleQueryChange={handleQueryChange} />
      </div>
      <div>
        <ImageGallery images={images} />
      </div>
      <div>
        {loadedImgCount > 0 && loadedImgCount !== page && <Button onHandleLoadMore={handleLoadMore} />}
      </div>
      <div>
        {isLoading && <Loader />}
      </div>
    </div>
  );
}