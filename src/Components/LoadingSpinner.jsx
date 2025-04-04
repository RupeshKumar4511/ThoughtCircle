export default function LoadingSpinner() {

    return (

        <div className="text-center mt-4">
            <div className="spinner-border" role="status" style={{"width":"5rem", "height":"5rem"}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}