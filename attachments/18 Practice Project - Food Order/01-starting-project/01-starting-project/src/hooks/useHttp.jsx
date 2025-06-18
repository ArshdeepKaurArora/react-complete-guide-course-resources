import { useCallback, useState } from "react"

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    console.log(error)

    const sendRequest = useCallback(async (requestConfig) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch(requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.message)
            setIsLoading(false)
            return data
        }

        setIsLoading(false)
        return data
    }, [])

    return {
        sendRequest,
        isLoading,
        error
    }
}