import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

const storedPickedPlaces = JSON.parse(localStorage.getItem('pickedItems')) || [];

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPickedPlaces);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    })
  }, []);

  function handleStartRemovePlace(id) {
    setOpenModal(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setOpenModal(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedItems = JSON.parse(localStorage.getItem('pickedItems')) || [];
    storedItems.push(AVAILABLE_PLACES.find((place) => {
      return place.id === id;
    }))
    localStorage.setItem('pickedItems', JSON.stringify(storedItems));
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setOpenModal(false);

    const storedItems = JSON.parse(localStorage.getItem('pickedItems')) || [];
    const updatedStoredItems = storedItems.filter((place) => {
      return place.id !== selectedPlace.current;
    })
    localStorage.setItem('pickedItems', JSON.stringify(updatedStoredItems));
  }, []);

  return (
    <>
      <Modal open={openModal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          fallbackText={"Sorting by distance from your location."}
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
