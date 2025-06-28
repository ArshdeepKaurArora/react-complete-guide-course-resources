import React from 'react'
import EventsList from '../components/EventsList'
import { useLoaderData, Await } from 'react-router-dom'
import { Suspense } from 'react'

const EventsPage = () => {
  const { events } = useLoaderData()
  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  )
}

export default EventsPage

const fetchEvents = async () => {
  const response = await fetch('http://localhost:8080/events');
  const data = await response.json();
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to fetch events' }), { status: 500 })
  }
  return data.events; 
}

export const eventsLoader = () => {
  return {
    events: fetchEvents()
  }
}