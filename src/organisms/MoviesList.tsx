import { Movie } from '../App'
import MoviesListItem from './MoviesListItem.tsx'

type MovieListProps = {
    movies: Movie[]
    onSelectMovie: (imdbID: string) => void
}

const MoviesList = ({ movies, onSelectMovie }: MovieListProps) => (
    <ul className="list list-movies">
        {movies.map(movie => (
            <MoviesListItem movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbid} />
        ))}
    </ul>
)

export default MoviesList
