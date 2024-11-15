#! /usr/bin/env bun
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { commit } from './cmd/commit'

yargs(hideBin(process.argv))
  .command(
    ['commit', 'c'],
    'Gera uma mensagem de commit',
    (yargs) => {
      yargs.option('y', {
        alias: 'yes',
        type: 'boolean',
        description: 'Executa a ação automaticamente',
      })
    },
    async (argv) => {
      const option: boolean = (argv?.y as boolean) ?? false
      await commit(option)
    },
  )
  .help()
  .alias('h', 'help')
  .demandCommand(1, 'Por favor, forneça pelo menos um comando')
  .strict()
  .parseAsync()
