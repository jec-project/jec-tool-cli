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

import {CliLogger} from "../CliLogger";
import chalk from "chalk";

/**
 * The default <code>CliLogger</code> implementation.
 * <code>ConsoleCliLogger</code> displayes CLI logs into the standard output.
 */
export class ConsoleCliLogger implements CliLogger {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ConsoleCliLogger</code> instance.
   */
  constructor() {
    if(ConsoleCliLogger._locked || ConsoleCliLogger.INSTANCE) {
      throw new Error();
    }
    ConsoleCliLogger._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>ConsoleCliLogger</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>ConsoleCliLogger</code> singleton instance reference.
   */
  private static INSTANCE:ConsoleCliLogger = null;

  /**
   * Returns a reference to the <code>ConsoleCliLogger</code> singleton.
   *
   * @return {CliLogger} a reference to the <code>ConsoleCliLogger</code>
   *                     singleton.
   */
  public static getInstance():CliLogger {
    if(ConsoleCliLogger.INSTANCE === null) {
      ConsoleCliLogger._locked = false;
      ConsoleCliLogger.INSTANCE = new ConsoleCliLogger();
    }
    return ConsoleCliLogger.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public log(message:string):void {
    console.log(message);
  }

  /**
   * @inheritDoc
   */
  public action(message:string):void {
    console.log(chalk.green(message));
  }
  
  /**
   * @inheritDoc
   */
  public verb(verb:string, message:string):void {
    console.log(chalk.green(`  ${verb} `) + message);
  }
  
  /**
   * @inheritDoc
   */
  public error(reason:any):void {
    console.log(chalk.red("An error occured:\n"));
    console.error(reason);
  }
  
  /**
   * @inheritDoc
   */
  public warn(reason:any):void {
    console.log(chalk.magenta("WARN:\n"));
    console.warn(reason);
  }
};
