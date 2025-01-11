import { useState } from "react";
import { useRef } from "react";

export default function Popup({ children, title }) {

	const [ showPopup, setShowPopup ] = useState(false)
	const popupRef = useRef()

	function show() {
		if (popupRef.current) {
			popupRef.current.animate([ { transform: "scale(1)", opacity: 1 }, { transform: "scale(0.9)", opacity: 0 } ], { duration: 200, iteration: 1 })
		}
		setTimeout(() => setShowPopup(curr => !curr), 100)
	}

    return (
		<div className="w-fit">
			<button onClick={show}>{ title }</button>
			{showPopup && <div ref={popupRef} className="animate-fadein fixed z-50"> { children } </div>}
		</div>
    )
}