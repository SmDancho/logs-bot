import { Telegraf  } from 'Telegraf'
import {IBotContext} from "../types/interfaces"

export abstract class CreatButton {

    constructor(protected bot:Telegraf<IBotContext>) {}

    abstract handleButton(): void
}