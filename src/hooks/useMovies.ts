import { convertLowercaseKeys } from '../libs'
import { Movie } from '../App'
import { useEffect, useState } from 'react'
import { Nullable } from '../types/utilities'
import { useDebouncedCallback } from 'use-debounce'

export const useMovies = (query: string, callback?: () => void): [Movie[], boolean, Nullable<string>] => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Nullable<string>>(null)

    const fetchMovies = async (query: string) => {
        setIsLoading(() => true)
        setError(() => null)

        try {
            const res = await fetch(`${process.env.API_URL}&s=${query}`)

            if (!res.ok) {
                throw new Error('Something went wrong with fetching movies...')
            }

            const data = await res.json()

            if ('Search' in data) {
                const convertedLowercaseKeys: Movie[] = data.Search.map((movie: Movie) => convertLowercaseKeys(movie))
                setMovies(convertedLowercaseKeys)
            } else {
                setMovies(() => [])
                throw new Error('No movies found...')
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message)
                setError(() => error.message)
            } else {
                console.error('An unknown error occurred:', error)
                setError(() => `An unknown error occurred...`)
            }
        } finally {
            setIsLoading(() => false)
        }
    }

    const debouncedFetchingMovies = useDebouncedCallback((query: string) => {
        if (!query.length) {
            setMovies([])
            setError(null)
        } else {
            void fetchMovies(query)
        }
    }, 1000)

    useEffect(() => {
        if (callback) {
            callback()
        }
        debouncedFetchingMovies(query)
    }, [query])

    return [movies, isLoading, error]
}
