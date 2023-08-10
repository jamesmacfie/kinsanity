import { Configuration, OpenAIApi } from 'openai';
export * as systemPrompts from './systemPrompts';

const configuration = new Configuration({
  apiKey: process.env['OPEN_AI_API_KEY'],
});

const openAiClient = new OpenAIApi(configuration);

type AskOptions = {
  userPrompt: string;
  systemPrompt: string;
};

export const ask = async ({ userPrompt, systemPrompt }: AskOptions) => {
  let completionResponse;
  try {
    completionResponse = await openAiClient.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });
  } catch (e) {
    return 'Sorry, something went wrong';
  }

  const message = completionResponse.data.choices[0].message?.content;

  return message;
};
