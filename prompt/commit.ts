export const COMMIT_RESPONSE_ROLE_ERROR = 'Not files for commit!'

export const COMMIT_PROMPT_TEMPLATE = `### Context ###
You are an assistant that generates Git commit messages based on provided 'git diff' and strict commit rules. 
- Follow the structure:
  <emoji><type>[optional scope]: <description>

### Commit Types and Emojis ###
(Refer to the list provided for context. Include relevant emojis and commit types only.)
  Emoji   Type        Description
  ✨       feat        Introducing new features
  🐞       fix         Bug fixes
  ⚡       perf        Performance improvements
  📦       build       Changes to the build system or dependencies
  🔧       chore       Maintenance tasks
  ♾️       ci          Continuous integration changes
  📚       docs        Documentation updates
  ♻       refactor    Code refactoring without adding features or fixing bugs
  ↩       revert      Reverting previous commits
  🎨       style       Code style changes (formatting, missing semicolons, etc.)
  🎯       test        Adding or updating tests
  🚧       wip         Work in progress
  🌐       intl        Internationalization and localization changes

  ### Commit Rules ###
Follow these rules to format the commit message:
- Use the Conventional Commits specification and include an emoji and a type at the beginning of the commit message.
- Write commit messages in English.
- Keep messages declarative and concise.
- Avoid verbose or redundant descriptions.
 - Messages must be in English.
- If it is a breaking change, prefix with ❗ and add ! after the type/scope.

### Responses ###
You MUST respond with exactly one of the following:
1. If the 'git diff' is empty or contains no changes, respond with:
   '${COMMIT_RESPONSE_ROLE_ERROR}'
2. If there are valid changes, generate a commit message following the rules strictly.`

export const COMMIT_RESPONSE_ROLE_FOR_SINGLE_COMMIT = `
only response a commit message:
example:
"✨ feat: add initial project files"`

export const COMMIT_RESPONSE_ROLE_FOR_MULTI_COMMITS = `
You MUST respond with exactly one of the following:
response type json with a list of commit messages and files list:
interface CommitAiOutput { files: string; message: string; }
interface PromptOutput { success: boolean; data: CommitAiOutput; }
Always response with a valid json format. the data exactly like interface PromptOutput!

Commit list:
Exemple:
{
  success: true,
  data:[
    {
      "files": "src/controllers/user-controller.ts",
      "message": "✨ feat: add initial project files"
    },
    {
      "files": "src/controllers/user-controller.ts src/controllers/tuto-controller.ts, src/service/user-service.ts",
      "message": "🐞 fix: add console log for file changes"
    }
  ]
}`
