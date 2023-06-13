import { Selection } from "@/app/page";
import React, { LegacyRef, useRef, useState } from "react";
import GeneratingPrompt from "./common/GeneratingPrompt";
import { Button, Dropdown, Input, Textarea } from "@nextui-org/react";
import { getPrompt } from "@/helper";
import { CreateChatCompletionResponseChoicesInner } from "openai";

type QuoteProps = {};

const Quotes: React.ForwardRefRenderFunction<HTMLFormElement> = function (
	props: QuoteProps,
	ref: LegacyRef<HTMLFormElement>
) {
	const [loading, setLoading] = useState(false);
	const [generatedArr, setGenerated] = useState<
		CreateChatCompletionResponseChoicesInner[]
	>([]);
	const [submitted, setSubmitted] = useState(false);

	const [name, setName] = useState<string | null>(null);
	const [role, setRole] = useState<string | null>(null);
	const [industry, setIndustry] = useState<string | null>(null);
	const [aspect, setAspect] = useState<string | null>(null);

	async function onSubmit() {
		event?.preventDefault();
		setSubmitted(true);
		setGenerated([]);
		const prompt = `
            Suggest an improvements to ${name} with the role ${role} in ${industry} industry, the following are the improvements to be made:
            ${aspect}
        `;
		setLoading(true);
		const generated = await getPrompt(prompt);
		setGenerated(generated);
		setLoading(false);
	}

	return (
		<form
			ref={ref}
			className="grid 2xl:grid-cols-2 items-center gap-4 mx-8 lg:mx-24 p-4  min-w-[300px] lg:min-w-[800px] max-w-[600px] min-h-[260px] max-h-[700px] bg-white rounded-xl"
			onSubmit={onSubmit}
		>
			{!submitted && (
				<>
					<div className="grid grid-cols-2 col-span-2">
						<div className="col-span-2 lg:col-span-1 lg:pl-2"></div>
					</div>

					<div className="col-span-2 ">
						<Input
							fullWidth
							label="Name"
							onChange={(e) => setName(e.target.value)}
						></Input>
						<Input
							fullWidth
							label="Role"
							onChange={(e) => setRole(e.target.value)}
						></Input>
						<Input
							fullWidth
							label="Industry"
							onChange={(e) => setIndustry(e.target.value)}
						></Input>
						<Input
							fullWidth
							label="Areas for improvements (separated by commas)"
							onChange={(e) => setAspect(e.target.value)}
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
				<div className="grid grid-cols-2 mt-4 col-span-2">
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

					<div className="flex justify-center col-span-2 mt-6 ">
						<Button
							className="mr-2"
							onClick={() => setSubmitted(false)}
							color="success"
							flat
						>
							New suggestions
						</Button>
						<Button onClick={() => onSubmit()} color="success" flat>
							Regenerate
						</Button>
					</div>
				</div>
			)}
		</form>
	);
};

export default React.forwardRef(Quotes);
