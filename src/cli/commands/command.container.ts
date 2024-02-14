import { Container } from 'inversify';

import { Component } from '../../types/component.enum.js';
import { Command } from './command.interface.js';
import { GenerateCommand } from './generate.command.js';
import { HelpCommand } from './help.command.js';
import { ImportCommand } from './import.command.js';
import { VersionCommand } from './version.command.js';

export function createCLIContainer() {
  const container = new Container();

  container.bind<Command>(Component.ImportCommand).to(ImportCommand).inSingletonScope();
  container.bind<Command>(Component.VersionCommand).to(VersionCommand).inSingletonScope();
  container.bind<Command>(Component.HelpCommand).to(HelpCommand).inSingletonScope();
  container.bind<Command>(Component.GenerateCommand).to(GenerateCommand).inSingletonScope();

  return container;
}
