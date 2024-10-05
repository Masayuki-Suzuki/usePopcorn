import { ChangeEvent, useEffect, useRef } from 'react'
import { Movie } from '../App.tsx'
import { Nullable } from '../types/utilities'

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

    useEffect(() => {
        const callBack = (e: KeyboardEvent) => {
            if (document.activeElement === inputEl.current) {
                return
            }

            if (e.code === 'Enter' && inputEl.current) {
                inputEl.current.focus()
                setQuery('')
            }
        }

        document.addEventListener('keydown', callBack)

        return () => {
            document.removeEventListener('keydown', callBack)
        }
    }, [setQuery])

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
