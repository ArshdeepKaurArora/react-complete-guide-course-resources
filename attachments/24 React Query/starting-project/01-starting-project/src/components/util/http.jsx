const fetchEvents = async (searchTerm) => {
    let url = 'http://localhost:3000/events';
    console.log("call", searchTerm)

    if (searchTerm) {
        url += '?search=' + searchTerm;
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

const fetchSelectableImages = async() => {
    const response = await fetch("http://localhost:3000/events/images");

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the images');
        error.code = response.code;
        error.info = await response.json();
        throw error;
    }

    const { images } = response.json()

    return images
}

const createNewEvent = async(data) => {
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

export {fetchEvents, fetchSelectableImages, createNewEvent};