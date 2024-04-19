import {OpenAIClient, AzureKeyCredential} from "@azure/openai";

export class Chat {
  private chatAPI: OpenAIClient;

  constructor(apikey: string) {
    // this.chatAPI = new ChatGPTAPI({
    //   apiKey: apikey,
    //   apiBaseUrl:
    //     process.env.OPENAI_API_ENDPOINT || 'https://api.openai.com/v1',
    //   completionParams: {
    //     model: process.env.MODEL || 'gpt-3.5-turbo',
    //     temperature: +(process.env.temperature || 0) || 1,
    //     top_p: +(process.env.top_p || 0) || 1,
    //     max_tokens: process.env.max_tokens
    //       ? +process.env.max_tokens
    //       : undefined,
    //   },
    // });
    this.chatAPI = new OpenAIClient(
        process.env.AZURE_API_ENDPOINT || 'https://openai-northus-region-credits.openai.azure.com/',
        new AzureKeyCredential(apikey));
  }

  private generatePrompt = (patch: string) => {
    const answerLanguage = process.env.LANGUAGE
      ? `Answer me in ${process.env.LANGUAGE},`
      : '';

    const prompt =
      process.env.PROMPT ||
        'Below is a code patch, please help me do a brief code review on it. Any bug risks and/or improvement suggestions are welcome:';

    return `${prompt}, ${answerLanguage}:
    ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);

    const { choices } = await this.chatAPI.getCompletions(
        process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt4-turbo',
        [prompt],
        {
          maxTokens: process.env.max_tokens
          ? +process.env.max_tokens
          : undefined,
          temperature: +(process.env.temperature || 0) || 1,
          topP: +(process.env.top_p || 0) || 1,
          n: 1,
        }
    );

    // const res = await this.chatAPI.sendMessage(prompt);

    for (const choice of choices) {
      return choice.text;
    }

    return '';

    // console.timeEnd('code-review cost');
    // return res.text;
  };
}
