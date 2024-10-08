import { WatchedMovie } from '../hooks/useLocalStorageState'

type WatchedMovieListItemProps = {
    movie: WatchedMovie
    onRemoveWatchedMovie: (imdbID: string) => void
}

const WatchedMoviesListItem = ({ movie, onRemoveWatchedMovie }: WatchedMovieListItemProps) => (
    <li className="watched-movie-list-item" key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
            <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
            </p>
        </div>
        <button className="btn-delete" onClick={() => onRemoveWatchedMovie(movie.imdbID)}>
            X
        </button>
    </li>
)

export default WatchedMoviesListItem
