import { $ } from 'bun'
import { OpenAiInstance, openApiRest, unwrapAiResponse } from '../helper'
import { COMMIT_PROMPT_TEMPLATE } from '../prompt'

export async function commit(exec: boolean = false): Promise<string> {
  const NOT_COMMIT = 'No commit message found'
  const ADD_FILE_CHANGES_DIFF = 'Please stage your changes before generating a commit message.'
  const stagedDiff = await $`git diff --cached`.text()

  if (!stagedDiff) {
    return ADD_FILE_CHANGES_DIFF
  }

  const PROMPT = `${COMMIT_PROMPT_TEMPLATE}\n ${stagedDiff},
  `

  // const llmResponse = await openApiRest({ content: PROMPT })
  const llmResponse = await OpenAiInstance.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: PROMPT }],
    temperature: 0.2,
  })
  const commitMessage = unwrapAiResponse(llmResponse)
  // console.log('🚀 ~ commit ~ llmResponse:', JSON.stringify(llmResponse, null, 2))

  if (!commitMessage || commitMessage === NOT_COMMIT) {
    return NOT_COMMIT
  }
  if (exec) {
    const apply = await $`git commit -m "${commitMessage}"`.text()
    console.log('🚀 ~ commit ~ apply:', apply)
    return apply
  }

  console.log('🚀 ~ commit ~ commitMessage:', commitMessage)
  return commitMessage
}
