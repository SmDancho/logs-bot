import { Telegraf , Context } from 'Telegraf'
import { IConfig, IBotContext } from './types/interfaces';
import LocalSession from 'telegraf-session-local'
import {Command} from  './commands/command.class'
import {Button} from './buttons/buttons.class'
import { StartCommand } from './commands/Start';
import {HanndleTasksButton} from './buttons/handleTasks'
import {ReportComand} from "./commands/GetTasksReport"

export class botInit { 
    private token: string;
    private bot: Telegraf<IBotContext>
    private readonly config: IConfig;
    private commands: Command[] = [];
    private buttons: Button[] = [];

    constructor(config: IConfig, ) {
        this.token = config.token;
        this.config = config
        this.bot = new Telegraf(this.token)
    }

    init() {
        this.commands = [new StartCommand(this.bot), new ReportComand(this.bot)]
        this.buttons = [new HanndleTasksButton(this.bot)]

        for (const command of this.commands) {
            command.handleCommand()
        }

        for (const button of this.buttons) {
            button.handleButton()
        }

    }

    public async botRun() {
        this.init()
        this.bot.launch();
    }


    public getConfig(): IConfig {
        return this.config;
    }

}
