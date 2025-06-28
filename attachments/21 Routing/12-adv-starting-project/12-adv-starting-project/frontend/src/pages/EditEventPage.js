import React from 'react'
import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

const EditEventPage = () => {

  const responseData = useRouteLoaderData('event-detail');
  const event = responseData.event;

  return (
    <EventForm event={event}/>
  )
}

export default EditEventPage