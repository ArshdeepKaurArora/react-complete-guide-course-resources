// @ts-check

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';

async function loadPlaces() {

  const data = await fetchAvailablePlaces();

  return (
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const sortedPlaces = sortPlacesByDistance(data.places, latitude, longitude);
        resolve(sortedPlaces);
        });
      }
    )
  );
}

export default function AvailablePlaces({ onSelectPlace }) {

  const {userPlaces: places, error, isFetching: isLoading, setError} = useFetch(loadPlaces, []);

  if (error) {
    return (
      <Error
        title="Error"
        message={error.message}
        onConfirm={() => setError(null)}
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
