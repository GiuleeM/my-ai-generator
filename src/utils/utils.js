import { OPENAI_API_KEY } from "./keys";

export async function generateImagePrompts(input) {
  const prompt = `Create 3 short titles that will be used as prompts for DALL-E of
   ${input} in different styles: digital art, sci-fi and realistic. 
   Return the titles inside of an array.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + OPENAI_API_KEY, // Replace with your OpenAI API key
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();

  const resultArray = data.choices[0].message.content;

  return JSON.parse(resultArray);
}

export async function generateImage(prompt) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: '256x256',
      response_format: 'b64_json',
    }),
  });

  const data = await response.json();
  const base64 = data.data[0].b64_json;

  return `data:image/png;base64,${base64}`;
}