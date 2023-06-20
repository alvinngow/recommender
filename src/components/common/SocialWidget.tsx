import React from "react";
import Image from "next/image";
import Alert from "./Alert";

type PropsType = {};

function SocialWidget() {
	const [showAlert, setShowAlert] = React.useState(false);

	return (
		<div className="flex justify-between w-full col-span-2 bg-white p-2 items-center shadow-lg mt-2 rounded-lg">
			<p className="font-medium">Love you see? Share it!</p>
			<div className="flex">
				<a
					href="https://www.linkedin.com/"
					target="_blank"
					onClick={() => {
						// setShowAlert(true);
						navigator.clipboard.writeText(
							"I enjoyed using recplus.ai to generate commendations for my co-workers!"
						);
					}}
				>
					<Image
						src="/social-linkedin.svg"
						width={48}
						height={48}
						alt="linkedin logo"
					></Image>
				</a>
				<a
					href="https://t.me/share/url?url=https://www.recplus.ai&text=I enjoyed using recplus.ai to generate commendations for my co-workers!"
					target="_blank"
				>
					<Image
						src="/social-telegram.svg"
						width={48}
						height={48}
						alt="telegram logo"
					></Image>
				</a>
				<a
					href="https://twitter.com/intent/tweet?text=I enjoyed using recplus.ai to generate commendations for my co-workers!"
					target="_blank"
				>
					<Image
						src="/social-twitter.svg"
						width={48}
						height={48}
						alt="twitter logo"
					></Image>
				</a>
				<a
					href="whatsapp://send?text=I enjoyed using recplus.ai to generate commendations for my co-workers!"
					target="_blank"
				>
					<Image
						src="/social-whatsapp.svg"
						width={48}
						height={48}
						alt="whatsapp logo"
					></Image>
				</a>
			</div>
		</div>
	);
}

export default SocialWidget;
