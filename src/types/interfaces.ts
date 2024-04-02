import { Context } from 'Telegraf'
import { Status } from '@prisma/client'

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

export interface Itask {
    id?: number
    title: string
    status?: Status
    author?: string
    userId: number
    dateCreated?: Date | string
    dateEnd?: Date | string
    totalTime?: string
}