type NumOfResultsProps = {
    count: number
}

const NumOfResults = ({ count }: NumOfResultsProps) => (
    <p className="num-results">
        Found <strong>{count}</strong> results
    </p>
)

export default NumOfResults
