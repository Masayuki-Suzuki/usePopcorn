import { useState } from 'react'
import ToggleButton from '../molecues/ToggleButton.tsx'
import { OnlyChildrenProps } from '../types/utilities.ts'

const Container = ({ children }: OnlyChildrenProps) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className="box">
            <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
            {isOpen && children}
        </div>
    )
}

export default Container
