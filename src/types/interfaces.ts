import { Context, Markup } from 'Telegraf'

export interface IConfig {
    token: string,
    admin: number
}

export interface IBotContext extends Context {
    session: {
        name: string
        start: Date
        end: Date
    }
}
