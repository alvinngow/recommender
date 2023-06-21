import { Button } from "@nextui-org/react";
import Image from "next/image";
import { SiteMode } from "@/app/page";

type NavProps = {
	siteMode: SiteMode;
	setSiteMode: React.Dispatch<React.SetStateAction<SiteMode>>;
};

function NavBar(props: NavProps) {
	return (
		<div className="absolute flex justify-center top-0 px-24 w-full ">
			{/* <Image src="/logo.png" className="pt-2" width={234} height={60}></Image> */}
			<div className="flex items-center">
				<Button
					className="min-w-0 hover:scale-125"
					light
					onClick={() => props.setSiteMode("ai")}
				>
					<p className={`text-xl ${props.siteMode == "ai" && "font-medium"}`}>
						Home
					</p>
				</Button>
				<p>|</p>
				<Button
					className=" hover:scale-125 "
					light
					onClick={() => props.setSiteMode("about")}
				>
					<p
						className={`text-xl text-black  lg:text-white ${
							props.siteMode == "about" && "font-medium"
						}`}
					>
						About
					</p>
				</Button>
			</div>
		</div>
	);
}

export default NavBar;
