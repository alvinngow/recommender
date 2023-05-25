"use client";
import React, { useRef } from "react";

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
import Image from "next/image";
import {
	ThemeProvider as NextThemesProvider,
	useTheme as useNextTheme,
} from "next-themes";
import { Configuration, OpenAIApi } from "openai";

export default function Home() {
	const darkTheme = createTheme({
		type: "dark",
		theme: {},
	});

	const lightTheme = createTheme({
		type: "light",
		theme: {},
	});

	const { setTheme } = useNextTheme();
	const { isDark, type } = useTheme();

	const [selected, setSelected] = React.useState("Short");
	const [tone, setTone] = React.useState("Casual");
	const [gender, setGender] = React.useState("Male");
	const [relationship, setRelationship] = React.useState("Managed directly");
	const [loading, setLoading] = React.useState(false);
	const [generated, setGenerated] = React.useState("");

	const title = useRef<HTMLInputElement | null>(null);
	const companyName = useRef<HTMLInputElement | null>(null);
	const recName = useRef<HTMLInputElement | null>(null);
	const skillset = useRef<HTMLInputElement | null>(null);

	async function onSubmit() {
		event?.preventDefault();
		setGenerated("");
		const prompt = `
    can you write me a linkedin recommendation with the following parameters:
    Tone: ${tone}
    Length: ${selected}
    Gender: ${gender}
    Name: ${recName.current!.value}
    Title: ${title.current!.value}
    Company Name: ${companyName.current!.value}
    Relationship: ${relationship}
    skillsets: ${skillset.current!.value}
    `;
		const configuration = new Configuration({
			organization: "org-ctBzyynSlfNtOwHI3gkiJLKs",
			apiKey: process.env.OPENAI_API_KEY,
		});
		delete configuration.baseOptions.headers["User-Agent"];

		const openai = new OpenAIApi(configuration);
		setLoading(true);
		const response = await openai
			.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: prompt }],
			})
			.then((response) => {
				setLoading(false);
				setGenerated(response.data.choices[0].message!.content);
			});
	}

	return (
		<NextThemesProvider
			defaultTheme="system"
			attribute="class"
			value={{
				dark: lightTheme.className,
			}}
		>
			<NextUIProvider>
				<main className="flex min-h-screen flex-col md:p-24 p-4">
					<form
						className="grid grid-cols-2 items-center gap-4"
						onSubmit={onSubmit}
					>
						<div className="grid grid-cols-2 md:flex md:justify-between col-span-2">
							<div>
								<p>Tone</p>
								<Dropdown>
									<Dropdown.Button flat>{tone}</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={tone}
										onSelectionChange={(e) => setTone(e as string)}
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

							<div>
								<p>Length</p>
								<Dropdown>
									<Dropdown.Button flat>{selected}</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={selected}
										onSelectionChange={(e) => setSelected(e as string)}
									>
										<Dropdown.Item key="Very Short">Very Short</Dropdown.Item>
										<Dropdown.Item key="Short">Short</Dropdown.Item>
										<Dropdown.Item key="Medium">Medium</Dropdown.Item>
										<Dropdown.Item key="Long">Long</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div>
								<p>Gender</p>
								<Dropdown>
									<Dropdown.Button flat>{gender}</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={gender}
										onSelectionChange={(e) => setGender(e as string)}
									>
										<Dropdown.Item key="Male">Male</Dropdown.Item>
										<Dropdown.Item key="Female">Female</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div>
								<p>Relationship</p>
								<Dropdown>
									<Dropdown.Button flat>{relationship}</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Static Actions"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={relationship}
										onSelectionChange={(e) => setRelationship(e as string)}
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
						<Input ref={title} label="Title"></Input>
						<Input ref={companyName} label="Company Name"></Input>
						<Input ref={recName} label="Name"></Input>
						<Input ref={skillset} label="Skillsets"></Input>
						<Button className="col-span-2" color="gradient" type="submit">
							{loading ? <Loading color="currentColor" size="sm" /> : "Submit"}
						</Button>
					</form>
					<div className="mt-4">
						<Textarea
							readOnly
							css={{ width: "100%", color: "Black" }}
							placeholder="Generated Prompt"
							rows={4}
							value={generated}
						/>
					</div>
				</main>
			</NextUIProvider>
		</NextThemesProvider>
	);
}
