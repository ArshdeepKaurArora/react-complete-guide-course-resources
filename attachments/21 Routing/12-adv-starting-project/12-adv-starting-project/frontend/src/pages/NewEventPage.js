import EventForm from '../components/EventForm'
import { redirect } from 'react-router-dom';

const NewEventPage = () => {
  return (
    <EventForm method='post' />
  )
}

export default NewEventPage

export const newEventAction = async ({request, params}) => {
  const data = await request.formData();
  const eventData = Object.fromEntries(data);
  
  const response = await fetch('http://localhost:8080/events', {
    method: request.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });

  if (response.status === 422) {
    console.log(response, "returning response");
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to create event' }), { status: 500 })
  }

  return redirect('/events');
}