#!/usr/bin/env node
import { CLIApp } from './cli/cli.js';
import { HelpCommand, VersionCommand, ImportCommand } from './cli/commands/index.js';

function bootstrap() {
  const cli = new CLIApp();

  cli.registerCommands([new HelpCommand(), new VersionCommand(), new ImportCommand()]);
  cli.processCommand(process.argv);
}

bootstrap();
