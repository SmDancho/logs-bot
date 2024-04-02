require("dotenv").config();
import { botInit } from './botInit'

const bot = new botInit(
    {
        "token": process.env.BOT_TOKEN as string,
        "admin": Number(process.env.BOT_ADMIN)
    }
)

bot.botRun()
