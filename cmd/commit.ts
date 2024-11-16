import { $ } from 'bun'
import { OpenAiInstance, unwrapAiResponse } from '../helper'
import {
  COMMIT_PROMPT_TEMPLATE,
  COMMIT_RESPONSE_ROLE_ERROR,
  COMMIT_RESPONSE_ROLE_FOR_MULTI_COMMITS,
  COMMIT_RESPONSE_ROLE_FOR_SINGLE_COMMIT,
} from '../prompt'
import clipboard from 'clipboardy'
import type { CommitAiOutput, PromptOutput } from '../prompt/prompt-response'

export type commitProps = {
  exec: boolean
  type?: 'single' | 'multi'
}

export async function commit({ exec = false, type = 'single' }: commitProps): Promise<string> {
  const isMultiCommit = type === 'multi'
  const ADD_FILE_CHANGES_DIFF = 'Please stage your changes before generating a commit message.'
  const stagedDiff = isMultiCommit ? await $`git diff`.text() : await $`git diff --cached`.text()

  if (!stagedDiff.trim()?.length) {
    console.log(`❗❗❗ ${ADD_FILE_CHANGES_DIFF}❗❗❗`)
    return ADD_FILE_CHANGES_DIFF
  }

  const PROMPT = `${COMMIT_PROMPT_TEMPLATE}
  ${isMultiCommit ? COMMIT_RESPONSE_ROLE_FOR_MULTI_COMMITS : COMMIT_RESPONSE_ROLE_FOR_SINGLE_COMMIT}
  ${stagedDiff},
  `

  const llmResponse = await OpenAiInstance.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: PROMPT }],
    temperature: 0.2,
  })
  const responseText = JSON.stringify(llmResponse, null, 2)
  console.log('🚀 ~ commit ~ llmResponse:', responseText)
  if (isMultiCommit) {
    const commitMessage = await handleMultiCommit(llmResponse, exec)
    return commitMessage
  }
  const commitMessage = await handleSingleCommit(llmResponse, exec)
  return commitMessage
}

async function handleSingleCommit(llmResponse: any, exec: boolean) {
  const commitMessage = unwrapAiResponse(llmResponse)

  if (!commitMessage || commitMessage === COMMIT_RESPONSE_ROLE_ERROR) {
    return COMMIT_RESPONSE_ROLE_ERROR
  }

  if (exec) {
    const apply = await $`git commit -m "${commitMessage}"`.text()
    console.log('🚀 ~ commit ~ apply:', apply)
    return apply
  }

  console.log('🚀 :: This message has copy to clipboard:', commitMessage)
  clipboard.writeSync(commitMessage)
  return commitMessage
}

async function handleMultiCommit(llmResponse: any, exec: boolean) {
  const commitMessage = unwrapAiResponse(llmResponse)
  clipboard.writeSync(JSON.stringify(commitMessage))
  console.log('🚀 :: This response has clipboard:', commitMessage)

  const { success, data } = JSON.parse(fixJsonString(commitMessage))

  if (!success) {
    console.log('🚧 Response:', commitMessage)
    return COMMIT_RESPONSE_ROLE_ERROR
  }

  if (exec) {
    for await (const { files, message } of data) {
      await $`git add ${files}"`
      const apply = await $`git commit -m "${message}"`.text()
      console.log('🚀 ~ GIT::commit', apply)
    }
  }
  return commitMessage
}

function fixJsonString(input: string) {
  return input.replace('```json', '').replace('```', '')
  // return input
  //   .replace(/([\s{,])(\w+):/g, '$1"$2":') // Adiciona aspas duplas em chaves sem aspas
  //   .replace(/'/g, '"') // Substitui aspas simples por aspas duplas
}