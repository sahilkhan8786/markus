
function DetailsOverlay({ setShowOverlay, children }) {
    function overlayCloseHandler() {
        setShowOverlay(null)
    }

    return (
        <div className="text-black p-4 text-sm tracking-widest z-50">
            <span className="absolute top-0 right-0 text-3xl p-3 cursor-pointer" onClick={overlayCloseHandler}>X</span>
            {children}
        </div>
    )
}

export default DetailsOverlay
