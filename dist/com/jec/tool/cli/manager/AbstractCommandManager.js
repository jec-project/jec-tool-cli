"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateNotifier = require("update-notifier");
class AbstractCommandManager {
    constructor(processTitle, pkgPath) {
        this.__strategy = null;
        this.__version = null;
        this.initObj(processTitle, pkgPath);
    }
    initObj(processTitle, pkgPath) {
        const PKG = require(pkgPath);
        updateNotifier({ pkg: PKG }).notify();
        process.title = processTitle;
        this.__version = PKG.version;
    }
    process() {
        this.__strategy.invokeCommand();
    }
}
exports.AbstractCommandManager = AbstractCommandManager;
