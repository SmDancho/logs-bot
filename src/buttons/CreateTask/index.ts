import { Telegraf , Markup} from 'Telegraf'
import { CreatButton } from "../buttons.class"
import type {IBotContext} from "../../types/interfaces"
import fs from 'fs'

export class CreateButton extends CreatButton {

    taskName: any

    constructor(bot:Telegraf<IBotContext>) {
        super(bot);
    }

    public handleButton(): void {
      this.bot.on('message' , (ctx) => {
        this.taskName = ctx.message
            ctx.reply('нажмите кнопку чтобы потвердить',
               Markup.inlineKeyboard([
                  Markup.button.callback(`создать задачу ${this.taskName?.text}`, 'createTask'),
              ]
            )
          )
        }
      )

      this.bot.action('createTask', async (ctx) => {
          if (this.taskName) {
            const data = JSON.stringify(
              {
                name: this.taskName?.text,
                start: new Date()
              }
            )
            await this._writeFile(data, ctx)
          }
          else {
            ctx.reply('введите название задачи')
          }
        }
      )
    }

    private async _writeFile(data: any, ctx: IBotContext) {
        fs.writeFile('db.json', data , (err) => {
          if(err) throw err
          else {ctx.reply(`Задача ${this.taskName.text} создана`)};
        }
      )
    }
}