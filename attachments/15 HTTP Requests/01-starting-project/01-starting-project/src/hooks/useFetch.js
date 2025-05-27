import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialData = []) {

    const [userPlaces, setUserPlaces] = useState(initialData);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
        setIsFetching(true);
        try {
            const data = await fetchFn();
            setUserPlaces(data || []);
        } catch (error) {
            setError({
            message: error.message || "Failed to fetch data.",
            });
        }
        setIsFetching(false);
        }
        fetchData();
    }, []);

    return {
        userPlaces,
        setUserPlaces,
        isFetching,
        error,
        setError
    };
}