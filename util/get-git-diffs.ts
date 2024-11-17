import { $ } from 'bun'

export async function getGitDiffs(all: boolean = false): Promise<string> {
  if (all) {
    $`git add .`
    const gitDiff = await $`git diff`.text()
    $`git reset --hard`
    return gitDiff
  }
  const gitDiff = await $`git diff --cached`.text()
  return gitDiff
}
