import { redirect, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem'


const EventDetailPage = () => {
  
  const responseData = useRouteLoaderData('event-detail');
  const event = responseData.event;

  return (
    <EventItem event={event} />
  )
}

export default EventDetailPage

export const eventDetailLoader = async ({request, params}) => {
  const response = await fetch(`http://localhost:8080/events/${params.id}`);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to fetch event' }), { status: 500 })
  }
  const data = await response.json();
  return data;
}
  
export const eventDeleteAction = async ({request, params}) => {
  const response = await fetch(`http://localhost:8080/events/${params.id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to delete event' }), { status: 500 })
  }

  return redirect('/events');
}

