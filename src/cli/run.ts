import { CLIApp } from './cli-app.js';
import { GenerateCommand } from './commands/generate.command.js';
import { HelpCommand } from './commands/help.command.js';
import { ImportCommand } from './commands/import.command.js';
import { VersionCommand } from './commands/version.command.js';

export function run() {
  const cli = new CLIApp();

  cli.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand(),
    new ImportCommand(),
  ]);
  cli.processCommand(process.argv);
}

