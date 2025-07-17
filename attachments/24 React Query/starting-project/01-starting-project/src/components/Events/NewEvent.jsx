import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createNewEvent } from '../util/http.jsx';
import { queryClient } from '../util/http.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  const {mutate } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      navigate("/events")
      queryClient.invalidateQueries({ queryKey: ["events"]})
    }
  })

  function handleSubmit(formData) {
    mutate({ event: formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
    </Modal>
  );
}
