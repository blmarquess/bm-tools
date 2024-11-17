import OpenAI from 'openai'
import type { ChatCompletion } from 'openai/resources/index.mjs'

// organization: process.env.OPENAI_API_ORG_ID,
// project: process.env.OPENAI_API_PROJECT_ID,
export const OpenAiInstance = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function openApiChatSDK(content: string, model: string = 'gpt-3.5-turbo') {
  const start = performance.now()
  const stream = await OpenAiInstance.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content }],
    stream: false,
  })
  console.log(stream)
  const fileName = `./responses/response-${stream.id}.json`
  const file = Bun.file(fileName, { type: 'application/json' })
  await Bun.write(file, JSON.stringify(stream))
  const end = performance.now()
  console.log(`${stream.id}\n time: ${end - start} ms || time: ${(end - start) / 1000} s`)
}

interface LLMChatInput {
  model?: string
  role?: string
  content?: string
  temperature?: number
}

export async function openApiRest({
  content,
  model = 'gpt-3.5-turbo',
  temperature = 0.2,
}: LLMChatInput): Promise<ChatCompletion> {
  const URI = 'https://api.openai.com/v1/chat/completions'
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }

  const data = {
    model,
    messages: [{ role: 'user', content }],
    temperature,
  }
  const response = await fetch(URI, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const responseContent = await response.json()
  return responseContent
}

/**
 *
 * @param chatCompletion OpenAi response
 * @returns  string | null to use for unwrapAiResponse when single response
 */
export function unwrapAiResponse(chatCompletion: ChatCompletion): string {
  const [messageResponse] = chatCompletion.choices
  const { content: message } = messageResponse.message
  return message || 'null'
}
