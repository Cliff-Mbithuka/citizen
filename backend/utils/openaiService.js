// const { Configuration, OpenAIApi } = require('openai');
// const dotenv = require('dotenv');

// dotenv.config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// const summarizeText = async (text) => {
//   try {
//     const response = await openai.createCompletion({
//       model: 'text-davinci-003',
//       prompt: `Summarize the following text:\n\n${text}`,
//       max_tokens: 150,
//     });
//     return response.data.choices[0].text.trim();
//   } catch (error) {
//     console.error('Error summarizing text:', error);
//     throw new Error('Failed to summarize text');
//   }
// };

// module.exports = { summarizeText };