import { Loading } from "@nextui-org/react";

function GeneratingPrompt() {
	return (
		<div className="flex flex-col items-center col-span-2">
			<Loading color="currentColor" size="sm" />
			<p className="pl-2">Please wait, generating a response for you!</p>
		</div>
	);
}

export default GeneratingPrompt;
