import { Button } from "@nextui-org/react";
import Image from "next/image";

function About() {
	return (
		<div className="flex min-h-screen justify-center pt-24 lg:p-24">
			<div className="flex items-center flex-col lg:w-1/2 px-2 text-left">
				<p className="text-4xl text-justify">About Us</p>
				<p className="mt-4 text-lg lg:text-2xl text-justify">
					Founded by two Information Systems professionals with a vision to
					bridge technology laggard&apos;s problems using generative A.I
				</p>
				<p className="mt-4 text-lg lg:text-2xl text-justify">
					With Recplus.AI, we aim to provide an easy-to-use structured interface
					where undergraduates and mid-career job seekers can get professional
					recommendations to stand out against their competition. Commendations
					are best given before receiving.
				</p>
				<p className="mt-4 text-lg lg:text-2xl text-justify">
					We often overlook beyond the &quot;Five Cs of Singapore&quot; —
					namely, cash, car, credit card, condominium and country club
					membership. There is no doubt in our hearts that when it comes to
					generative AI going mainstream, Credibility through Commendations will
					be the most important Cs to stand out in the future.
				</p>
				<div className="w-full mt-4">
					<a href="https://www.linkedin.com/company/recplusai/" target="_blank">
						<button>
							<Image
								src="/linkedin.svg"
								width={200}
								height={60}
								alt="linkedin icon"
							></Image>
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}

export default About;
