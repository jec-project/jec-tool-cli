//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {ConfigParser} from "../../util/ConfigParser";
import {CommandConfig} from "../../util/CommandConfig";
import * as minimist from "minimist";
import * as path from "path";
import {HelpManager} from "../HelpManager";
import {OptionConfig} from "../../util/OptionConfig";
import {CommandStrategy} from "./CommandStrategy";
import {CliLogger} from "../../logging/CliLogger";
import {ConsoleCliLogger} from "../../logging/impl/ConsoleCliLogger";

/**
 * <code>AbstractCommandStrategy</code> is the abstract class for the 
 * <code>CommandStrategy</code> interface.
 */
export abstract class AbstractCommandStrategy implements CommandStrategy {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AbstractCommandStrategy</code> instance.
   * 
   * @param {string} version the version of the current process.
   */
  constructor(version:string) {
    this.initObj(version);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The path to the scripts.
   */
  private _scriptPath:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Protected properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A collection that contains user's inputs.
   */
  protected __argv:any = null;

  /**
   * The version of the current process.
   */
  protected __version:string = null;

  /**
   * A map that contains all the references of the available commands  for this
   * object.
   */
  protected __commands:Map<string, CommandConfig> = null;

  /**
   * The command config parser for this object.
   */
  protected __parser:ConfigParser = null;
  
  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initialises this object. This method is called by the constructor function.
   * 
   * @param {string} version the version of the current process.
   */
  private initObj(version:string):void {
    this.__version = version;
    this.__commands = new Map<string, CommandConfig>();
    this.__argv = minimist(process.argv.slice(2));
    this.__parser = new ConfigParser();
  }

  /**
   * Returns a boolean that indicates whether the user's inputs are valid for
   * the current command (<code>true</code>), or  not (<code>false</code>).
   * 
   * @param {CommandConfig} cmd the current command config.
   * @param {any} config the user's input.
   * @return {boolean} <code>true</code> whether the user's inputs are valid;
   *         <code>false</code> otherwise.
   */
  private checkOptions(cmd:CommandConfig, config:any):boolean {
    const logger:CliLogger = ConsoleCliLogger.getInstance();
    const options:OptionConfig[] = cmd.options;
    const commandName:string = cmd.command;
    let isValid:boolean = true;
    let len:number = -1;
    let option:OptionConfig = null;
    let propName:string = null;
    if(options) {
      len = options.length;
      while(len--) {
        option = options[len];
        propName = option.name;
        if(option.required && !config.hasOwnProperty(propName)) {
          logger.error(`Invalid command: "${propName}" property is required`);
          logger.log(
            `\nUse "HELP ${commandName}" to get command properties information.`
          );
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Protected methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initialises the commands for this object.
   * 
   * @param {any} config the config for this object.
   */
  protected initCommands(config:any):void {
    const cfg:CommandConfig[] = this.__parser.parse(config);
    let len:number = cfg.length;
    let cmd:CommandConfig = null;
    while(len--) {
      cmd = cfg[len];
      this.__commands.set(cmd.command, cmd);
      this.__commands.set(cmd.alias, cmd);
    }
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getScriptsPath():string {
    return this._scriptPath;
  }

  /**
   * @inheritDoc
   */
  public setScriptPath(path:string):void {
    this._scriptPath = path;
  }

  /**
   * @inheritDoc
   */
  public invokeCommand():void {
    const commandName:string = this.__argv._[0];
    const cmd:CommandConfig = this.__commands.get(commandName.toLowerCase());
    if(cmd) {
      if(cmd.command === "help" || cmd.alias === "h") {
        HelpManager.build().showHelp(this.__argv, this.__commands);
      } else {
        if(this.checkOptions(cmd, this.__argv)) {
          const module:any = require(
            path.join(this._scriptPath, cmd.action)
          );
          module.run(this.__argv);
        }
      }
    } else {
      HelpManager.build().showSummary(this.__commands);
    }
  }
}