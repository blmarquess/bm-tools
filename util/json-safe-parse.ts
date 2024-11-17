import type { CommitAiOutput, PromptOutput } from '../prompt/prompt-response'

export function jsonSafeParse<T = PromptOutput<CommitAiOutput[]>>(inputString: string): T {
  try {
    const obj: T = JSON.parse(inputString)
    return obj
  } catch (error: any) {
    try {
      let sanitizedString = inputString
        .replace(/'/g, '"')
        .replace(/([{,]\s*)(\w+):/g, '$1"$2":')
        .replace(/,(\s*[}\]])/g, '$1')

      const openBraces = (sanitizedString.match(/{/g) || []).length
      const closeBraces = (sanitizedString.match(/}/g) || []).length
      const openBrackets = (sanitizedString.match(/\[/g) || []).length
      const closeBrackets = (sanitizedString.match(/]/g) || []).length

      if (openBraces > closeBraces) {
        sanitizedString += '}'.repeat(openBraces - closeBraces)
      }
      if (openBrackets > closeBrackets) {
        sanitizedString += ']'.repeat(openBrackets - closeBrackets)
      }

      return JSON.parse(sanitizedString)
    } catch (finalError: any) {
      console.error(finalError)
      throw new Error(
        `Failed to parse JSON string. Original Error: ${error.message}, Correction Error: ${finalError.message}`,
      )
    }
  }
}
