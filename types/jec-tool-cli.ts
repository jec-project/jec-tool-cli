/*!
 * JEC TOOL CLI Node Module
 * Copyright(c) 2017-2018 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <http://jecproject.org>
 */

declare module "jec-tool-cli" {

export interface Command {    run(argv: any): void;}export interface CliLogger {    log(message: string): void;    action(message: string): void;    verb(verb: string, message: string): void;    error(reason: any): void;    warn(reason: any): void;}export class ConsoleCliLogger implements CliLogger {    constructor();    private static _locked;    private static INSTANCE;    static getInstance(): CliLogger;    log(message: string): void;    action(message: string): void;    verb(verb: string, message: string): void;    error(reason: any): void;    warn(reason: any): void;}export interface CommandManager {    process(): void;}}