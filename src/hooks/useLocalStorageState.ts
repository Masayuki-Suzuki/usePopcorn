import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export type WatchedMovie = {
    imdbID: string
    title: string
    year: string
    poster: string
    runtime: number
    imdbRating: number
    userRating: number
    countRatingDecisions: number
}

export const useLocalStorageState = <T>(initialState: T, key: string): [T, Dispatch<SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        const storedWatched = localStorage.getItem(key)
        return storedWatched ? (JSON.parse(storedWatched) as T) : initialState
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}
