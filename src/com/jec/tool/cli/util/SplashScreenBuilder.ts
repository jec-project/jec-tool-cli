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

import chalk from "chalk";
import * as figlet from "figlet";

/**
 * A static class that build splash screens. 
 */
export class SplashScreenBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SplashScreenBuilder</code> instance.
   */
  constructor(){}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a string that represents a splash screen.
   * 
   * @param label the text dislplayed over the splash screen.
   * @return a string that represents a splash screen.
   */
  public static build(label:string,
                                   horizontalLayout:string = "default"):string {
    return chalk.yellow(
            figlet.textSync(label, { horizontalLayout: horizontalLayout })
           );
  }
}