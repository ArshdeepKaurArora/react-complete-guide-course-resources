export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    
    if (!response.ok) {
        throw new Error("Unable to fetch the data.")
    }

    const data = await response.json();
    return data;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({places: places}),
    });

    if (!response.ok) {
        throw new Error("Unable to update the data.")
    }

    const data = await response.json();
    return data;
}