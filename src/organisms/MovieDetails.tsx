import { useEffect, useRef, useState } from 'react'
import { Nullable } from '../types/utilities'
import StarRating from '../molecues/StarRating'
import ErrorMessage from '../molecues/ErrorMessage'
import { convertLowercaseKeys } from '../libs'
import { useKey } from '../hooks/useKey'
import { WatchedMovie } from '../hooks/useLocalStorageState'

type MovieDetailsProps = {
    imdbID: string
    onCloseMovie: () => void
    onAddWatchedMovie: (movie: WatchedMovie) => void
    watchedMovies: WatchedMovie[]
}

type MovieDetails = {
    [key: string]: string
} & {
    Ratings: Rating[]
    userRating: number
}

type Rating = {
    Source: string
    Value: string
}

type ErrorResponse = {
    message: string
    reason: string
}

const MovieDetails = ({ imdbID, onCloseMovie, onAddWatchedMovie, watchedMovies }: MovieDetailsProps) => {
    const [movieDetails, setMovieDetails] = useState<Nullable<MovieDetails>>(null)
    const [rating, setRating] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Nullable<ErrorResponse>>(null)
    const [imageURL, setImageURL] = useState('')

    const countRef = useRef(0)

    const isWatched = watchedMovies.some(movie => movie.imdbID === imdbID)

    const handleImageLoad = () => {
        setImageURL('https://via.placeholder.com/300x430/ddd/000.webp?text=No%20Image%20Available')
    }

    const fetchMovieDetails = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${process.env.API_URL}&i=${imdbID}`)
            const data = await res.json()

            if (data && data.Response === 'False') {
                setMovieDetails(null)
                setError(() => ({
                    message: 'An error occurred...',
                    reason: data.Error
                }))
                throw new Error('fetch')
            }

            if (!data && !Object.keys(data).length) {
                setMovieDetails(null)
                throw new Error('No movie details found...')
            } else {
                setMovieDetails(convertLowercaseKeys(data))
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching movie details:', error.message)
                if (error.message !== 'fetch') {
                    setError(() => ({
                        message: 'Error fetching movie',
                        reason: error.message
                    }))
                }
            } else {
                console.error('An unknown error occurred:', error)
                setError(() => ({
                    message: 'An unknown error occurred...',
                    reason: 'Sorry, we were unable to catch the cause of the error.'
                }))
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleRatingChange = (newRating: number) => {
        setRating(newRating)
    }

    const handleAddWatchedMovieClick = () => {
        if (!movieDetails) return

        const newAddWatchedMovie: WatchedMovie = {
            imdbID,
            title: movieDetails.title,
            year: movieDetails.year,
            poster: movieDetails.poster,
            runtime: Number(movieDetails.runtime.split(' ')[0]),
            imdbRating: Number(movieDetails.imdbrating),
            userRating: rating,
            countRatingDecisions: countRef.current
        }

        onAddWatchedMovie(newAddWatchedMovie)
    }

    useEffect(() => {
        void fetchMovieDetails()
    }, [imdbID])

    useEffect(() => {
        if (movieDetails) {
            document.title = `Movie Details - ${movieDetails.title}`
            setImageURL(movieDetails.poster)
        } else {
            document.title = 'Movie Details'
        }

        return () => {
            document.title = 'usePopcorn'
        }
    }, [movieDetails])

    useEffect(() => {
        if (rating) {
            countRef.current++
        }
    }, [rating])

    useEffect(() => {
        if (isWatched) {
            const targetMovie = watchedMovies.find(movie => movie.imdbID === imdbID)
            if (targetMovie) {
                setRating(targetMovie.userRating)
            }
        }
    }, [])

    useKey('Escape', onCloseMovie)

    return (
        <div className="details">
            <button className="btn-back" onClick={onCloseMovie}>
                &larr;
            </button>

            {isLoading && <p className="loader">Loading movie...</p>}

            {!isLoading && error && (
                <ErrorMessage>
                    <>
                        <p>{error.message}</p>
                        <p>Reason: {error.reason}</p>
                    </>
                </ErrorMessage>
            )}

            {!isLoading && !error && movieDetails && (
                <>
                    <header>
                        <img onError={handleImageLoad} src={imageURL} alt="" />
                        <div className="details-overview">
                            <h2>{movieDetails.title}</h2>
                            <p>
                                {movieDetails.released} &bull; {movieDetails.runtime}{' '}
                            </p>
                            <p>{movieDetails.genre}</p>
                            <p>
                                <span>⭐️</span>
                                {movieDetails.imdbrating} IMDb Rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating rating={rating} onSetRating={handleRatingChange} size={24} />
                                    {rating > 0 && (
                                        <button className="btn-add" onClick={handleAddWatchedMovieClick}>
                                            + Add to List
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p style={{ textAlign: 'center' }}>
                                    You have already rated with movie {rating} <span>⭐️</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{movieDetails.plot}</em>
                        </p>
                        <p>Starring {movieDetails.actors}</p>
                        <p>Directed by {movieDetails.director}</p>
                    </section>
                </>
            )}
        </div>
    )
}

export default MovieDetails
