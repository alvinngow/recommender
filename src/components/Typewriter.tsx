import { useEffect, useState } from "react";

type TypewriterProps = {
	text: string;
	delay: number;
	className?: string;
};

function Typewriter(props: TypewriterProps) {
	const [message, setMessage] = useState(props.text);
	const [displayed, updateDisplay] = useState("");

	let animID: number;
	useEffect(() => {
		updateDisplay(message.charAt(0)); // call once to avoid empty element flash
		animID = Number(setInterval(typeLetter, props.delay));

		return () => {
			updateDisplay("");
			clearInterval(animID);
		};
	}, [message]); // this make sure it re-renders every time the content changes (return function resets display)

	const typeLetter = () => {
		updateDisplay((prevText) => {
			if (message.length <= prevText.length) clearInterval(animID);
			return prevText.concat(message.charAt(prevText.length));
		});
	};
	return <p className={props.className}>{displayed}</p>;
}

export default Typewriter;
