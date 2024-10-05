import Star from '../atoms/Star.tsx'
import { useState } from 'react'

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '1.5rem'
}

const starContainerStyle = {
    display: 'flex',
    gap: '2px'
}

type StarRatingProps = {
    maxRating?: number
    color?: string
    size?: number
    rating?: number
    onSetRating: (rating: number) => void
}

const StarRating = ({ maxRating = 10, color = '#fcc419', size = 48, rating = 0, onSetRating }: StarRatingProps) => {
    const [tempRating, setTempRating] = useState(0)

    const textStyle = {
        lineHeight: 1,
        margin: 0,
        fontSize: size,
        color
    }

    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }).map((_, index) => (
                    <Star
                        key={index}
                        onRate={() => onSetRating(index + 1)}
                        full={tempRating ? tempRating >= index + 1 : rating >= index + 1}
                        inHoverIn={() => setTempRating(index + 1)}
                        inHoverOut={() => setTempRating(0)}
                        size={size}
                        color={color}
                    />
                ))}
            </div>
            <p style={textStyle}>{tempRating || rating || ''}</p>
        </div>
    )
}

export default StarRating
