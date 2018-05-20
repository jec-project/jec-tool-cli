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

/**
 * The <code>CliLogger</code> interface defines the minimu set of APIs that you
 * must implement to create loggers for all JEC Command Line Interfaces.
 */
export interface CliLogger {

  /**
   * Displays a log message in the output.
   * 
   * @param message the message to display in the output.
   */
  log(message:string):void;

  /**
   * Displays a message related to an action in the output.
   * 
   * @param message the message to display in the output.
   */
  action(message:string):void;
  
  /**
   * Displays a message related to an verb in the output.
   * 
   * @param verb the verb associated with the message to display.
   * @param message the message to display in the output.
   */
  verb(verb:string, message:string):void;
  
  /**
   * Displays an error message in the output.
   * 
   * @param reason the error message to display in the output.
   */
  error(reason:any):void;
  
  /**
   * Displays a warning message in the output.
   * 
   * @param reason the warning message to display in the output.
   */
  warn(reason:any):void;
};
