import { Selection } from "@/app/page";
import React, { LegacyRef, useRef, useState } from "react";
import GeneratingPrompt from "./common/GeneratingPrompt";
import { Button, Dropdown, Input, Textarea } from "@nextui-org/react";
import { getPrompt } from "@/helper";
import { CreateChatCompletionResponseChoicesInner } from "openai";
import SocialWidget from "./common/SocialWidget";

type QuoteProps = {
	submitted: boolean;
	setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Quotes: React.ForwardRefRenderFunction<HTMLFormElement, QuoteProps> =
	function (props: QuoteProps, ref: LegacyRef<HTMLFormElement>) {
		const { submitted, setSubmitted, loading, setLoading, ...others } = props;

		const [length, setLength] = useState<Selection>(new Set("Short"));
		const [mood, setMood] = useState<Selection>(new Set("Love"));
		const [generatedArr, setGenerated] = useState<
			CreateChatCompletionResponseChoicesInner[]
		>([]);

		const [about, setAbout] = useState<string | null>(null);

		async function onSubmit() {
			event?.preventDefault();
			setSubmitted(true);
			setGenerated([]);
			const prompt = `
            can you write me a quote with the following parameters:
            Mood: ${[...mood][0]}
            Length: ${[...length][0]}
            About: ${about}
        `;
			setLoading(true);
			const generated = await getPrompt(prompt);
			setGenerated(generated);
			setLoading(false);
		}

		return (
			<form
				ref={ref}
				className="grid 2xl:grid-cols-2 items-center gap-4 mx-8 lg:mx-24 p-4 min-w-[290px] max-w-[600px] min-h-[260px] bg-opacity-70 bg-white rounded-xl"
				onSubmit={onSubmit}
			>
				{!submitted && (
					<>
						<div className="grid grid-cols-2 col-span-2">
							<div className="col-span-2 lg:col-span-1 lg:pr-2">
								<p>Mood</p>
								<Dropdown>
									<Dropdown.Button css={{ width: "100%" }} color="success" flat>
										{mood}
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={mood}
										onSelectionChange={(e) => setMood(e)}
									>
										<Dropdown.Item key="Love">Love</Dropdown.Item>
										<Dropdown.Item key="Joy">Joy</Dropdown.Item>
										<Dropdown.Item key="Anger">Anger</Dropdown.Item>
										<Dropdown.Item key="Sad">Sad</Dropdown.Item>
										<Dropdown.Item key="Surprise">Surprise</Dropdown.Item>
										<Dropdown.Item key="Fear">Fear</Dropdown.Item>
										<Dropdown.Item key="Disgust">Disgust</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div className="col-span-2 lg:col-span-1 lg:pl-2">
								<p>Length</p>
								<Dropdown>
									<Dropdown.Button css={{ width: "100%" }} color="success" flat>
										{length}
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={length}
										onSelectionChange={(e) => setLength(e)}
									>
										<Dropdown.Item key="Short">Short</Dropdown.Item>
										<Dropdown.Item key="Medium">Medium</Dropdown.Item>
										<Dropdown.Item key="Long">Long</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>

						<div className="col-span-2 ">
							<Input
								fullWidth
								label="Generate me a quote about"
								onChange={(e) => setAbout(e.target.value)}
							></Input>
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
				{loading && <GeneratingPrompt />}

				{submitted && !loading && (
					<div className="grid grid-cols-2 mt-4 col-span-2 min-w-[290px]">
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

						<div className="grid grid-cols-2 col-span-2 mt-6 ">
							<Button
								className="mr-2"
								onClick={() => setSubmitted(false)}
								color="success"
								flat
							>
								New Quote
							</Button>
							<Button onClick={() => onSubmit()} color="success" flat>
								Regenerate
							</Button>
							<SocialWidget></SocialWidget>
						</div>
					</div>
				)}
			</form>
		);
	};

export default React.forwardRef(Quotes);
