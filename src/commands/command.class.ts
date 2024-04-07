import { Telegraf  } from 'telegraf'
import {IBotContext} from "../types/interfaces"

export abstract class Command {

    constructor(protected bot:Telegraf<IBotContext>){}


    abstract handleCommand():void
}