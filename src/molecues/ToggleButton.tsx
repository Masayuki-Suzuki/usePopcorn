import { Dispatch } from 'react'

type ToggleButtonProps = {
    isOpen: boolean
    setIsOpen: Dispatch<boolean>
}

const ToggleButton = ({ isOpen, setIsOpen}: ToggleButtonProps) => (
    <button
        className="btn-toggle"
        onClick={() => setIsOpen(!isOpen)}
    >
        {isOpen ? '–' : '+'}
    </button>
)

export default ToggleButton
