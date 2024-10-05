import { OnlyChildrenProps } from '../types/utilities'
import Logo from '../atoms/Logo'

const Navigation = ({ children }: OnlyChildrenProps) => (
    <nav className="nav-bar">
        <Logo />
        {children}
    </nav>
)

export default Navigation
