/*!
 * JEC TOOL CLI Node Module
 * Copyright(c) 2017-2018 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <http://jecproject.org>
 */

declare module "jec-tool-cli" {

export interface Command {    run(argv: any): void;}export interface CliLogger {    log(message: string): void;    action(message: string): void;    verb(verb: string, message: string): void;    error(reason: any): void;    warn(reason: any): void;}export class ConsoleCliLogger implements CliLogger {    constructor();    private static _locked;    private static INSTANCE;    static getInstance(): CliLogger;    log(message: string): void;    action(message: string): void;    verb(verb: string, message: string): void;    error(reason: any): void;    warn(reason: any): void;}export abstract class AbstractCommandManager implements CommandManager {    constructor(processTitle: string);    protected __strategy: CommandStrategy;    protected __version: string;    private initObj(processTitle);    process(): void;}export interface CommandManager {    process(): void;}export class HelpManager {    constructor();    private readonly EMPTY_STRING;    private readonly WHITESPACE;    private readonly NEW_LINE;    private readonly REQUIRED;    private readonly OPTIONAL;    private getGutter(size);    private getRequiredPrefix(required);    private outputHelpInfo(command);    static build(): HelpManager;    showSummary(commandList: Map<string, CommandConfig>): void;    showHelp(argv: any, commandList: Map<string, CommandConfig>): void;}export abstract class AbstractCommandStrategy implements CommandStrategy {    constructor(version: string);    protected __argv: any;    protected __version: string;    protected __commands: Map<string, CommandConfig>;    protected __parser: ConfigParser;    private initObj(version);    private checkOptions(cmd, config);    protected initCommands(config: any): void;    invokeCommand(): void;}export interface CommandStrategy {    invokeCommand(): void;}export class CommandConfig {    constructor();    command: string;    action: string;    alias: string;    description: string;    usage: string;    signature: string;    options: OptionConfig[];}export class CommandConfigBuilder {    constructor();    build(config: any): CommandConfig;}export class ConfigParser {    constructor();    parse(config: any): CommandConfig[];}export class OptionConfig {    constructor();    name: string;    required: boolean;    description: string;}export class OptionConfigBuilder {    constructor();    build(config: any): OptionConfig;}export class OptionParser {    constructor();    parse(config: any): OptionConfig[];}}