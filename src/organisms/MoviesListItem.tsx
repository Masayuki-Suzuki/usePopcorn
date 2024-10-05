import { Movie } from '../App'
import { useEffect, useState } from 'react'

type MovieListItemProps = {
    movie: Movie
    onSelectMovie: (imdbID: string) => void
}

const MoviesListItem = ({ movie, onSelectMovie }: MovieListItemProps) => {
    const [imageURL, setImageURL] = useState('')

    const handleImageLoad = () => {
        setImageURL('https://via.placeholder.com/300x430/ddd/000.webp?text=No%20Image%20Available')
    }

    useEffect(() => {
        setImageURL(movie.poster)
    }, [movie])

    return (
        <li onClick={() => onSelectMovie(movie.imdbid)}>
            <img src={imageURL} onError={handleImageLoad} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.year}</span>
                </p>
            </div>
        </li>
    )
}

export default MoviesListItem
