import { redirect, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem'
import { Suspense } from 'react'
import { Await } from 'react-router-dom'
import EventsList from '../components/EventsList'


const EventDetailPage = () => {
  
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage

const fetchEvents = async () => {
  const response = await fetch('http://localhost:8080/events');
  const data = await response.json();
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to fetch events' }), { status: 500 })
  }
  return data.events; 
}

const fetchEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to fetch event details' }), { status: 500 })
  }
  const data = await response.json();
  return data.event;
}

export const eventDetailLoader = async ({request, params}) => {
  const id = params.id;
  return {
    event: await fetchEvent(id),
    events: fetchEvents(),
  };
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

