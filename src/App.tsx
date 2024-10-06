import { useEffect, useState } from 'react'
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
import { useMovies } from './hooks/useMovies'
import { useLocalStorageState, WatchedMovie } from './hooks/useLocalStorageState'

export type Movie = {
    imdbid: string
    title: string
    year: string
    poster: string
    type?: string
}

export default function App() {
    const [query, setQuery] = useState('')
    const [selectedMovieID, setSelectedMovieID] = useState<Nullable<string>>(null)
    const [movies, isLoading, error] = useMovies(query, handleCloseMovieDetails)
    const [watched, setWatched] = useLocalStorageState<WatchedMovie[]>([], 'watchedMovies')

    function handleCloseMovieDetails() {
        setSelectedMovieID(null)
    }

    const handleSelectMovie = (imdbID: string) => {
        setSelectedMovieID(selectedMovieID === imdbID ? null : imdbID)
    }

    const handleAddWatchedMovie = (movie: WatchedMovie) => {
        setWatched(prevWatched => [...prevWatched, movie])
        setSelectedMovieID(null)
    }

    const handleRemoveWatchedMovie = (imdbID: string) => {
        setWatched(prevWatched => prevWatched.filter(movie => movie.imdbID !== imdbID))
    }

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
