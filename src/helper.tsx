import { Configuration, OpenAIApi } from "openai";

export async function getPrompt(prompt: string) {
	const configuration = new Configuration({
		organization: "org-ctBzyynSlfNtOwHI3gkiJLKs",
		apiKey: process.env.OPENAI_API_KEY,
	});
	delete configuration.baseOptions.headers["User-Agent"];

	const openai = new OpenAIApi(configuration);

	const response = await openai
		.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
			n: 3,
		})
		.then((response) => {
			console.log("🚀 ~ file: helper.tsx:19 ~ .then ~ response:", response);
			return response.data.choices;
		});

	return response;
}
