import { Telegraf  } from 'Telegraf'
import {IBotContext} from "../types/interfaces"

export abstract class Button {

    constructor(protected bot:Telegraf<IBotContext>) {}

    abstract handleButton(): void
}