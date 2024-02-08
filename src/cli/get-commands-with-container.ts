import { defineRootContainer } from '#root-container.js';
import { Component } from '#types/component.enum.js';

import { Command } from './commands/command.interface.js';

export function getCommandsWithContainer() {
  const rootContainer = defineRootContainer();

  return [
    rootContainer.get<Command>(Component.ImportCommand),
    rootContainer.get<Command>(Component.HelpCommand),
    rootContainer.get<Command>(Component.GenerateCommand),
    rootContainer.get<Command>(Component.VersionCommand),
  ];
}
