import {
	createTheme,
	NextUIProvider,
	Input,
	useTheme,
	Switch,
	Dropdown,
	Textarea,
	Button,
	Loading,
} from "@nextui-org/react";

import React, { useRef, Key } from "react";

import { Selection } from "@/app/page";

import { LegacyRef, MutableRefObject } from "react";
import GeneratingPrompt from "./common/GeneratingPrompt";
import { getPrompt } from "@/helper";
import { CreateChatCompletionResponseChoicesInner } from "openai";

type RecProps = {
	ref: LegacyRef<HTMLFormElement> | null;
};

const Recommender: React.ForwardRefRenderFunction<HTMLFormElement, RecProps> =
	function (props: RecProps, ref) {
		const [submitted, setSubmitted] = React.useState(false);

		const [selected, setSelected] = React.useState<Selection>(
			new Set(["Medium"])
		);
		const [tone, setTone] = React.useState<Selection>(
			new Set(["Professional"])
		);
		const [gender, setGender] = React.useState<Selection>(new Set(["Male"]));
		const [relationship, setRelationship] = React.useState<Selection>(
			new Set(["Managed directly"])
		);
		const [loading, setLoading] = React.useState(false);
		const [generatedArr, setGeneratedArr] = React.useState<
			CreateChatCompletionResponseChoicesInner[]
		>([]);

		const title = useRef<HTMLInputElement | null>(null);
		const companyName = useRef<HTMLInputElement | null>(null);
		const recName = useRef<HTMLInputElement | null>(null);
		const skillset = useRef<HTMLInputElement | null>(null);

		function promptMaker() {
			const rs = [...relationship][0];
			let prompt = "";

			if (rs == "Studied together") {
				prompt = `
			can you write me a linkedin recommendation with the following parameters:
			Tone: ${[...tone][0]}
			Length: ${[...selected][0]}
			Gender: ${[...gender][0]}
			Name: ${recName.current!.value}
			School Name: ${companyName.current!.value}
			skillsets: ${skillset.current!.value}
			`;
			} else {
				prompt = `
			can you write me a linkedin recommendation with the following parameters:
			Tone: ${[...tone][0]}
			Length: ${[...selected][0]}
			Gender: ${[...gender][0]}
			Relationship: ${[...relationship][0]}
			Name: ${recName.current!.value}
			Title: ${title.current!.value}
			Company Name: ${companyName.current!.value}
			skillsets: ${skillset.current!.value}
    		`;
			}
			return prompt;
		}

		async function onSubmit() {
			event?.preventDefault();
			setSubmitted(true);
			setGeneratedArr([]);
			const prompt = promptMaker();

			setLoading(true);
			const generated = await getPrompt(prompt);
			setGeneratedArr(generated);
			setLoading(false);
		}
		return (
			<form
				ref={ref}
				className="grid 2xl:grid-cols-2 items-center gap-4 mx-8 lg:mx-24 p-4 min-w-[300px] lg:min-w-[600px] min-h-[580px] bg-white rounded-xl"
				onSubmit={onSubmit}
			>
				{!submitted && (
					<>
						<div className="grid grid-cols-2 col-span-2">
							<div className="col-span-2 lg:col-span-1 lg:pr-2">
								<p>Tone</p>
								<Dropdown>
									<Dropdown.Button css={{ width: "100%" }} color="success" flat>
										{tone}
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={tone}
										onSelectionChange={(e) => setTone(e)}
									>
										<Dropdown.Item key="Casual">Casual</Dropdown.Item>
										<Dropdown.Item key="Professional">
											Professional
										</Dropdown.Item>
										<Dropdown.Item key="Witty">Witty</Dropdown.Item>
										<Dropdown.Item key="Joyful">Joyful</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div className="col-span-2 lg:col-span-1 lg:pl-2">
								<p>Length</p>
								<Dropdown>
									<Dropdown.Button css={{ width: "100%" }} color="success" flat>
										{selected}
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={selected}
										onSelectionChange={(e) => setSelected(e)}
									>
										<Dropdown.Item key="Very Short">Very Short</Dropdown.Item>
										<Dropdown.Item key="Short">Short</Dropdown.Item>
										<Dropdown.Item key="Medium">Medium</Dropdown.Item>
										<Dropdown.Item key="Long">Long</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div className="col-span-2 lg:col-span-1 lg:pr-2">
								<p>Gender</p>
								<Dropdown>
									<Dropdown.Button css={{ width: "100%" }} color="success" flat>
										{gender}
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={gender}
										onSelectionChange={(e) => setGender(e)}
									>
										<Dropdown.Item key="Male">Male</Dropdown.Item>
										<Dropdown.Item key="Female">Female</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div className="col-span-2 lg:col-span-1 lg:pl-2">
								<p>Relationship</p>
								<Dropdown>
									<Dropdown.Button css={{ width: "100%" }} color="success" flat>
										{relationship}
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={relationship}
										onSelectionChange={(e) => setRelationship(e)}
									>
										<Dropdown.Item
											css={{
												innerHeight: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Managed directly"
										>
											Managed directly
										</Dropdown.Item>
										<Dropdown.Item key="Reported directly">
											Reported directly
										</Dropdown.Item>
										<Dropdown.Item
											css={{
												height: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Senior but did not manage directly"
										>
											Senior but did not manage directly
										</Dropdown.Item>
										<Dropdown.Item
											css={{
												height: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Senior to you but did not manage directly"
										>
											Senior to you but did not manage directly
										</Dropdown.Item>
										<Dropdown.Item
											css={{
												height: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Work with in the same group"
										>
											Work with in the same group
										</Dropdown.Item>
										<Dropdown.Item
											css={{
												height: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Work with in different group"
										>
											Work with in different group
										</Dropdown.Item>
										<Dropdown.Item
											css={{
												height: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Work with but in a different company"
										>
											Work with but in a different company
										</Dropdown.Item>
										<Dropdown.Item
											css={{
												height: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Was a client"
										>
											Was a client
										</Dropdown.Item>
										<Dropdown.Item
											css={{
												height: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Taught"
										>
											Taught
										</Dropdown.Item>
										<Dropdown.Item
											css={{
												height: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Mentored"
										>
											Mentored
										</Dropdown.Item>
										<Dropdown.Item
											css={{
												height: "auto",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											key="Studied together"
										>
											Studied together
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>

						<div className="col-span-2 ">
							<Input ref={recName} fullWidth label="Name"></Input>
						</div>
						{[...relationship][0] !== "Studied together" && (
							<div className="col-span-2">
								<Input ref={title} fullWidth label="Title"></Input>
							</div>
						)}
						<div className="col-span-2">
							<Input
								ref={companyName}
								label={`${
									[...relationship][0] == "Studied together"
										? "School Name"
										: "Company Name"
								}`}
								fullWidth
							></Input>
						</div>

						<div className="col-span-2">
							<Input ref={skillset} fullWidth label="Skillsets"></Input>
						</div>
						<Button
							className="col-span-2 mt-4"
							css={{ backgroundColor: "#4fd593" }}
							type="submit"
						>
							Generate
						</Button>
					</>
				)}
				{loading && (
					<GeneratingPrompt text="Generating 3 sample responses for you!" />
				)}
				{submitted && !loading && (
					<div className="mt-4 col-span-2">
						{generatedArr.map((content, i) => {
							return (
								<div key={i} className="col-span-2">
									<Textarea
										readOnly
										css={{ width: "100%", color: "Black" }}
										placeholder="Generated Prompt"
										rows={6}
										value={content.message?.content}
									/>
									<Button
										onClick={() =>
											navigator.clipboard.writeText(content.message!.content)
										}
										css={{ backgroundColor: "#4fd593" }}
										className="my-2"
									>
										Copy to clipboard
									</Button>
								</div>
							);
						})}
						<div className="grid grid-cols-2 mt-4 min-w-[70%]">
							<Button
								className="col-span-2"
								onClick={() => setSubmitted(false)}
								color="success"
								flat
							>
								New Recommendation
							</Button>
							<Button
								className="col-span-2 mt-2"
								onClick={() => onSubmit()}
								color="success"
								flat
							>
								Regenerate
							</Button>
						</div>
					</div>
				)}
			</form>
		);
	};

export default React.forwardRef(Recommender);
