import { Loading } from "@nextui-org/react";

type GenerateProps = {
	text?: string;
};

function GeneratingPrompt(props: GenerateProps) {
	return (
		<div className="flex flex-col items-center col-span-2">
			<Loading color="currentColor" size="sm" />
			{props.text ? (
				<p className="pl-2">Please wait, generating a response for you!</p>
			) : (
				<p className="pl-2">{props.text}</p>
			)}
		</div>
	);
}

export default GeneratingPrompt;
