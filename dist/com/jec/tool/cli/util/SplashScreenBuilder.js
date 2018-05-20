"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const figlet = require("figlet");
class SplashScreenBuilder {
    constructor() { }
    static build(label, horizontalLayout = "default") {
        return chalk_1.default.yellow(figlet.textSync(label, { horizontalLayout: horizontalLayout }));
    }
}
exports.SplashScreenBuilder = SplashScreenBuilder;
