"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class ConsoleCliLogger {
    constructor() {
        if (ConsoleCliLogger._locked || ConsoleCliLogger.INSTANCE) {
            throw new Error();
        }
        ConsoleCliLogger._locked = true;
    }
    static getInstance() {
        if (ConsoleCliLogger.INSTANCE === null) {
            ConsoleCliLogger._locked = false;
            ConsoleCliLogger.INSTANCE = new ConsoleCliLogger();
        }
        return ConsoleCliLogger.INSTANCE;
    }
    log(message) {
        console.log(message);
    }
    action(message) {
        console.log(chalk_1.default.green(message));
    }
    verb(verb, message) {
        console.log(chalk_1.default.green(`  ${verb} `) + message);
    }
    error(reason) {
        console.log(chalk_1.default.red("An error occured:\n"));
        console.error(reason);
    }
    warn(reason) {
        console.log(chalk_1.default.magenta("WARN:\n"));
        console.warn(reason);
    }
}
ConsoleCliLogger._locked = true;
ConsoleCliLogger.INSTANCE = null;
exports.ConsoleCliLogger = ConsoleCliLogger;
;
