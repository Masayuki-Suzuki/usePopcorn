import { ChangeEvent } from 'react'
import { Movie } from '../App.tsx'

type SearchBarProps = {
    movies: Movie[]
    query: string
    setQuery: (query: string) => void
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={handleSearch} />
}

export default SearchBar
