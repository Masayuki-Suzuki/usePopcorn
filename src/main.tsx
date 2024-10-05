import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// import StarRating from './molecues/StarRating.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
        {/*<StarRating />*/}
    </StrictMode>
)
