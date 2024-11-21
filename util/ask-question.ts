import readline from 'readline'
import chalk from 'chalk'
import { NOT, YES } from '../constants'

export async function askQuestion(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const ask = () => {
      rl.question(chalk.bold.blueBright(`${question} yes/no (y/n) [default: y]: `), (answer) => {
        const normalizedAnswer = answer.trim().toLowerCase()
        if (YES.includes(normalizedAnswer) || normalizedAnswer === '') {
          rl.close()
          return resolve(true)
        }
        if (NOT.includes(normalizedAnswer)) {
          rl.close()
          return resolve(false)
        }
        console.log(chalk.bold.red('Invalid answer. Please enter "y" or "n".'))
        return ask()
      })
    }
    return ask()
  })
}
