import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const fetchEvents = async ({searchValue, max}) => {
    let url = new URL('http://localhost:3000/events');

    if (searchValue) {
        url.searchParams.append("search", searchValue)
    }

    if (max) {
        url.searchParams.append("max", max)
    }

    const response = await fetch(url);

    if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
    }

    const { events } = await response.json();

    return events;
}

export const fetchSelectableImages = async() => {
    const response = await fetch("http://localhost:3000/events/images");

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the images');
        error.code = response.code;
        error.info = await response.json();
        throw error;
    }

    const { images } = await response.json()

    return images
}

export const createNewEvent = async(data) => {
    const response = await fetch("http://localhost:3000/events", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = new Error('An error occurred while sending event data');
        error.code = await response.code;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();

    return event
}

export const deleteEvent = async({id}) => {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const error = new Error("An error occurred while deleting the event");
        error.code = response.code;
        error.info = await response.json();
        throw error;
    }

    return response.json()
}

export const fetchEvent = async({id}) => {
    const response = await fetch(`http://localhost:3000/events/${id}`);

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the event");
        error.code = response.code;
        error.info = (await response).json();
        throw error;
    }

    const { event } = await response.json();

    return event;
}

export const editEvent = async({id, updatedEvent}) => {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({event: updatedEvent})
    });
    
    if (!response.ok) {
        const error = new Error("An error occurred while updating the event")
        error.code = response.code;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();

    return event
}