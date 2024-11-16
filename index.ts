#! /usr/bin/env bun
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { commit } from './cmd/commit'

yargs(hideBin(process.argv))
  .command(
    ['commit', 'c'],
    'Gera uma mensagem de commit',
    (yargs) => {
      yargs
        .option('y', {
          alias: 'yes',
          type: 'boolean',
          description: 'Executa a ação automaticamente',
          default: false,
        })
        .option('m', {
          alias: 'multi',
          type: 'boolean',
          description: 'Tipo de commit multi',
          default: false,
        })
    },
    async (argv) => {
      const exec: boolean = (argv?.y as boolean) ?? false
      const type = (argv?.multi as boolean) ? 'multi' : 'single'
      const execMultiCommit = { exec, type }
      await commit({ exec, type })
    },
  )
  .help()
  .alias('h', 'help')
  .demandCommand(1, 'Por favor, forneça pelo menos um comando')
  .strict()
  .parseAsync()
