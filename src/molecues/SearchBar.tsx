import { ChangeEvent, useEffect, useRef } from 'react'
import { Movie } from '../App.tsx'
import { Nullable } from '../types/utilities'
import { useKey } from '../hooks/useKey'

type SearchBarProps = {
    movies: Movie[]
    query: string
    setQuery: (query: string) => void
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
    const inputEl = useRef<Nullable<HTMLInputElement>>(null)

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        if (inputEl && inputEl.current) {
            inputEl.current.focus()
        }
    }, [inputEl.current])

    useKey('Enter', () => {
        if (document.activeElement === inputEl.current) {
            return
        }

        if (inputEl && inputEl.current) {
            inputEl.current.focus()
            setQuery('')
        }
    })

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={handleSearch}
            ref={inputEl}
        />
    )
}

export default SearchBar
