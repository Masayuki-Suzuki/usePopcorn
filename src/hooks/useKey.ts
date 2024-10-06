import { useEffect } from 'react'

export const useKey = (key: string, action: () => void) => {
    const callback = (e: KeyboardEvent) => {
        if (e.code.toLowerCase() === key.toLowerCase()) {
            action()
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', callback)

        return () => {
            document.removeEventListener('keyup', callback)
        }
    }, [])
}
