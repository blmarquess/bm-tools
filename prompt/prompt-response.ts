export interface PromptOutput<T = string> {
  success: boolean
  data: T
}
export interface CommitAiOutput {
  files: string[]
  message: string
}
