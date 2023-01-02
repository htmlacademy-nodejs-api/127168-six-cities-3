import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import { readFileSync } from 'fs';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';

  private readVersion(): string {
    const contentPageJSON = readFileSync('./package.json', 'utf-8');
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    console.log((
      `${chalk.bold('Project version')}\n${chalk.bold.green(version)}\n`
    ));
  }
}
