import React, { useState, useEffect } from 'react';
import { SearchBar } from './searchBar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { getImages } from '../api';
import { Button } from './button/Button';
import { nanoid } from 'nanoid';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImgCount, setLoadedImgCount] = useState(0);
  const [randomId, setRandomId] = useState(nanoid());

  useEffect(() => {
    if (query) {
      fetchData()
    };
  }, [query, page, randomId]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = query.slice(query.indexOf('/') + 1);
      const data = await getImages(result, page);

      setImages(prevImages => [...prevImages, ...data.hits]);
      setLoadedImgCount(Math.ceil(data.totalHits / 12));
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleQueryChange = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setRandomId(nanoid());
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
        {loadedImgCount > 0 && loadedImgCount !== page && (
          <Button onHandleLoadMore={handleLoadMore} />
        )}
      </div>
      <div>{isLoading && <Loader />}</div>
    </div>
  );
};
