import React from 'react'
import EventsList from '../components/EventsList'
import { useLoaderData } from 'react-router-dom'

const EventsPage = () => {
  const responseData = useLoaderData()
  return (
    <div>
      <EventsList events={responseData.events} />
    </div>
  )
}

export default EventsPage

export const eventsLoader = async () => {
  const response = await fetch('http://localhost:8080/events');
  const data = await response.json();
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Failed to fetch events' }), { status: 500 })
  }
  return data;
}