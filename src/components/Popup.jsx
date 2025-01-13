import { useEffect, useState } from "react";
import { useRef } from "react";

export default function Popup({ children, title, collapsible }) {

	const [ showPopup, setShowPopup ] = useState(false)
	const popupRef = useRef()
	const reqButton = useRef()

	useEffect(() => {
		showPosition();
	}, [showPopup]);

	function showPosition() {
		const elementRight = popupRef.current?.getBoundingClientRect().right;
		const elementLeft = popupRef.current?.getBoundingClientRect().left;
		const elementBottom = popupRef.current?.getBoundingClientRect().bottom;

		const clientRight = document.documentElement.clientWidth;
		const clientBottom = document.documentElement.clientHeight;
	
		if(elementRight >= clientRight) {
			popupRef.current.style.right = "10px";
		}

		else if(elementLeft <= 0) {
			popupRef.current.style.left = "10px";
		}

		if(elementBottom >= clientBottom) {
			popupRef.current.style.bottom = reqButton.current.clientHeight+"px";
		}
		
	}
	
	function show() {
		if (popupRef.current) {
			popupRef.current.animate([ { transform: "scale(1)", opacity: 1 }, { transform: "scale(0.9)", opacity: 0 } ], { duration: 200, iteration: 1 })
		}

		setTimeout(() => setShowPopup(curr => !curr), 100)
	}

	function handleClick() {
		if (collapsible) {
			setShowPopup(false)
		}
	}

    return (
		<div className="select-none">
			<button ref={reqButton} onClick={show} className="font-medium">{ title }</button>
			{showPopup && <div onClick={handleClick} ref={popupRef} className="animate-fadein absolute z-50"> { children } </div>}
		</div>
    )
}