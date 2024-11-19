import { $ } from 'bun'
import chalk from 'chalk'
import { OpenAiInstance, unwrapAiResponse } from '../helper'
import {
  COMMIT_PROMPT_TEMPLATE,
  COMMIT_RESPONSE_ROLE_ERROR,
  COMMIT_RESPONSE_ROLE_FOR_MULTI_COMMITS,
  COMMIT_RESPONSE_ROLE_FOR_SINGLE_COMMIT,
} from '../prompt'
import clipboard from 'clipboardy'
import { jsonSafeParse } from '../util'
import type { CommitAiOutput, PromptOutput } from '../prompt/prompt-response'
import { getGitDiffs } from '../util/get-git-diffs'

export type commitProps = {
  exec: boolean
  type?: 'single' | 'multi'
}

// const chalk = new Chalk({level: 2});

export async function commit({ exec = false, type = 'single' }: commitProps): Promise<string> {
  const isMultiCommit = type === 'multi'
  const ADD_FILE_CHANGES_DIFF = 'Please stage your changes before generating a commit message.'
  const stagedDiff = await getGitDiffs(isMultiCommit)

  if (!stagedDiff.trim()?.length) {
    console.log(`❗❗❗ ${chalk.bold.white(ADD_FILE_CHANGES_DIFF)}❗❗❗`)
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
    console.log(chalk.greenBright('🚀 ~ commit ~ apply:'), apply)
    return apply
  }

  console.log(chalk.blue('🚀 :: This message has copy to clipboard:'), chalk.yellow(commitMessage))
  clipboard.writeSync(commitMessage)
  return commitMessage
}

async function handleMultiCommit(llmResponse: any, exec: boolean) {
  const commitMessage = unwrapAiResponse(llmResponse)
  const { success, data } = jsonSafeParse<PromptOutput<CommitAiOutput[]>>(commitMessage)
  clipboard.writeSync(JSON.stringify(commitMessage))

  if (!success) {
    console.log(chalk.red('🚧 Response:'), commitMessage)
    return COMMIT_RESPONSE_ROLE_ERROR
  }

  if (exec) {
    for await (const { files, message } of data) {
      await $`git add ${files}"`
      const apply = await $`git commit -m "${message}"`.text()
      console.log(chalk.green('🚀 ~ GIT::commit'), apply)
    }
  }
  return commitMessage
}
