import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import Navigation from './organisms/Navigation'
import MoviesList from './organisms/MoviesList'
import SearchBar from './molecues/SearchBar'
import NumOfResults from './atoms/NumOfResults'
import Container from './organisms/Container'
import WatchedStats from './organisms/WatchedStats'
import WatchedMoviesList from './organisms/WatchedMoviesList'
import Main from './organisms/Main'
import { Nullable } from './types/utilities'
import ErrorMessage from './molecues/ErrorMessage'
import MovieDetails from './organisms/MovieDetails'
import { convertLowercaseKeys } from './libs'

export type Movie = {
    imdbid: string
    title: string
    year: string
    poster: string
    type?: string
}
export type WatchedMovie = {
    imdbID: string
    title: string
    year: string
    poster: string
    runtime: number
    imdbRating: number
    userRating: number
}

export default function App() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState<Movie[]>([])
    const [watched, setWatched] = useState<WatchedMovie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Nullable<string>>(null)
    const [selectedMovieID, setSelectedMovieID] = useState<Nullable<string>>(null)

    const fetchMovies = async () => {
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

    const debouncedFetchingMovies = useDebouncedCallback(() => {
        if (!query.length) {
            setMovies([])
            setError(null)
        } else {
            void fetchMovies()
        }
    }, 1000)

    const handleSelectMovie = (imdbID: string) => {
        setSelectedMovieID(selectedMovieID === imdbID ? null : imdbID)
    }

    const handleCloseMovieDetails = () => {
        setSelectedMovieID(null)
    }

    const handleAddWatchedMovie = (movie: WatchedMovie) => {
        setWatched(prevWatched => {
            const newWatchedMovies = [...prevWatched, movie]
            localStorage.setItem('watchedMovies', JSON.stringify(newWatchedMovies))
            return newWatchedMovies
        })
        setSelectedMovieID(null)
    }

    const handleRemoveWatchedMovie = (imdbID: string) => {
        setWatched(prevWatched => {
            const updatedWatchedMovies = prevWatched.filter(movie => movie.imdbID !== imdbID)
            localStorage.setItem('watchedMovies', JSON.stringify(updatedWatchedMovies))
            return updatedWatchedMovies
        })
    }

    useEffect(() => {
        debouncedFetchingMovies()
    }, [query])

    useEffect(() => {
        const storedJSON = localStorage.getItem('watchedMovies')
        if (storedJSON) {
            const storedWatchedData = JSON.parse(storedJSON)
            setWatched(storedWatchedData)
        }
    }, [])

    return (
        <>
            <Navigation>
                <SearchBar movies={movies} query={query} setQuery={setQuery} />
                <NumOfResults count={movies.length} />
            </Navigation>
            <Main>
                <Container>
                    <>
                        {isLoading && <p className="loader">Loading...</p>}
                        {!isLoading && !error && <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />}
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </>
                </Container>
                <Container>
                    {selectedMovieID ? (
                        <MovieDetails
                            imdbID={selectedMovieID}
                            onCloseMovie={handleCloseMovieDetails}
                            onAddWatchedMovie={handleAddWatchedMovie}
                            watchedMovies={watched}
                            key={selectedMovieID}
                        />
                    ) : (
                        <>
                            <WatchedStats watched={watched} />
                            <WatchedMoviesList watched={watched} onRemoveWatchedMovie={handleRemoveWatchedMovie} />
                        </>
                    )}
                </Container>
            </Main>
        </>
    )
}
