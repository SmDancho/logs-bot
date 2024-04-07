import { Telegraf , Markup} from 'telegraf'
import { Command } from "../command.class"
import type {IBotContext} from "../../types/interfaces"

export class StartCommand extends Command {

    constructor(bot:Telegraf<IBotContext>) {
        super(bot);
    }

    handleCommand(): void {
        this.bot.start(
            (ctx: IBotContext) => {
                ctx.reply(
                'Введите название задачи что бы начать отслеживать ее выполнение'                
                )
            }, 
        )
        
    }
}