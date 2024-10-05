import { Nullable } from '../types/utilities'
import MovieDetails from '../organisms/MovieDetails'

// eslint-disable-next-line
export const convertLowercaseKeys = (obj: any): Nullable<MovieDetails> => {
    if (!obj) return null

    // eslint-disable-next-line
    return Object.entries(obj).reduce((carry: any, [key, value]) => {
        carry[key.toLowerCase()] = value

        return carry
    }, {})
}
