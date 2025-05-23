import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {

  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async() => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/places');

        if (!response.ok) {
          throw new Error("Unable to fetch the data.")
        }

        const data = await response.json();

        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setPlaces(sortPlacesByDistance(data.places, latitude, longitude));
          setIsLoading(false);
        });
      } catch (error) {
        setFetchError({message: error.message || "Unable to fetch the data."});
        setIsLoading(false);
      }
    }
    fetchPlaces();
  }, [])

  if (fetchError) {
    return (
      <Error
        title="Error"
        message={fetchError.message}
        onConfirm={() => setFetchError(null)}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText="No places available."
      isLoading={isLoading}
      onSelectPlace={onSelectPlace}
    />
  );
}
