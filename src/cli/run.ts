import { CLIApp } from './cli-app.js';
import { HelpCommand } from './commands/help.js';
import { ImportCommand } from './commands/import.js';
import { VersionCommand } from './commands/version.js';

export function run() {
  const cli = new CLIApp();

  cli.registerCommands([new HelpCommand(), new VersionCommand(), new ImportCommand()]);
  cli.processCommand(process.argv);
}

