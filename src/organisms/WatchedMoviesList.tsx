import WatchedMoviesListItem from './WatchedMoviesListItem'
import { WatchedMovie } from '../hooks/useLocalStorageState'

type WatchedMovieListProps = {
    watched: WatchedMovie[]
    onRemoveWatchedMovie: (imdbID: string) => void
}

const WatchedMoviesList = ({ watched, onRemoveWatchedMovie }: WatchedMovieListProps) => (
    <ul className="list">
        {watched.map(movie => (
            <WatchedMoviesListItem movie={movie} key={movie.imdbID} onRemoveWatchedMovie={onRemoveWatchedMovie} />
        ))}
    </ul>
)

export default WatchedMoviesList
