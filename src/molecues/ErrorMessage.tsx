export type ErrorMessageElement = string | JSX.Element | JSX.Element[]

type ErrorMessageProps = {
    children: ErrorMessageElement
}

const ErrorMessage = ({ children }: ErrorMessageProps) => (
    <div className="error">
        <h2>⛔️</h2>
        {children}
    </div>
)

export default ErrorMessage
