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
 * The <code>CommandStrategy</code> interface defines the API you must implement
 * to create objects that are used to specify what command must be used
 * depending on users inputs.
 */
export interface CommandStrategy {
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Invokes the command to run depending on the current user's input.
   */
  invokeCommand():void;

  /**
   * Returns the path used to load script files.
   * 
   * @return the path used to load script files.
   */
  getScriptsPath():string;

  /**
   * Sets the path used to load script files.
   * 
   * @param path the path used to load script files.
   */
  setScriptPath(path:string):void;
}