import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async() => {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/places');
      const data = await response.json();
      setPlaces(data.places);
      setIsLoading(false);
    }
    fetchPlaces();
  }, [])

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
