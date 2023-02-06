import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import ImagesList from '../components/Images/ImagesList';
import { fetchImages } from '../util/database';

function AllImages({ route }) {
  const [loadedImages, setLoadedImages] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadImages() {
      const images = await fetchImages();
      setLoadedImages(images);
    }

    if (isFocused) {
      loadImages();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route, params.place]);
    }
  }, [isFocused]);

  return <ImagesList images={loadedImages} />;
}

export default AllImages;
