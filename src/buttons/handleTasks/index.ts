import { Telegraf , Markup} from 'Telegraf'
import { Button } from "../buttons.class"
import type {IBotContext} from "../../types/interfaces"
import { userRepo } from '../../Database/reposetories/userRepo'
import { taskRepo } from '../../Database/reposetories/taskRepo'
import { intervalToDuration } from 'date-fns'
import { Itask } from '../../types/interfaces'
import { timeZone } from '../../utils/timezone'

export class HanndleTasksButton extends Button {
    private taskName: any;
    private user: userRepo
    private task: taskRepo
    private isUser: boolean | undefined 

    constructor(bot:Telegraf<IBotContext>) {
      super(bot);
      this.user = new userRepo()
      this.task = new taskRepo()
    }

    public handleButton(): void {
          this.bot.on('message' , async (ctx) => {

            this.isUser = await this.user.isUserExist(ctx.from.id)

            if (!this.isUser && ctx.from.username) {
              this.user.createUser( ctx.from.id , ctx.from.username)
            }

            this.taskName = ctx.message;
            ctx.reply('нажмите кнопку чтобы потвердить',
                Markup.inlineKeyboard([
                  Markup.button.callback('создать', 'createTask'),
                ]
              )
            )
          }
        )

      this.bot.action('createTask', async (ctx) => {
          if (ctx.from === undefined) {
            throw new Error('ctx.from is undefined')
          }

          if (!this.taskName) {
            ctx.reply('введите название задачи')
          }
          else {    
            const data: Itask = {
              title: this.taskName.text,
              status: "ACTIVE",
              userId: ctx.from.id
            }
          
            await this._createTask(data, ctx)

            ctx.reply(`текущая задача ${data.title} начата в ${timeZone(new Date())}`,
                 Markup.inlineKeyboard([
                  Markup.button.callback(`закрыть`, 'closeTask'),
                ]
              )
            )
          }
        }
      )


      this.bot.action('closeTask', async (ctx: IBotContext) => {
        if (ctx.from === undefined) {
          throw new Error('ctx.from is undefined')
        }
        
        await this._closeTask(ctx)
  
      }
    )
    }

    private async _createTask(data: Itask, ctx: IBotContext) {
      await this.task.create(data, ctx)
      .then(() => ctx.reply(`задача ${data.title} создана`))
      
    }

    private async _closeTask(ctx: IBotContext) {
      const currentTask = await this.task.getActieveTask(ctx);
      if(ctx.from === undefined) {
        return
      }

      const spendedTime = intervalToDuration(
        {
          start: currentTask.dateCreated, 
          end: new Date()
        }
      );

      await this.task.close(
          {
            ...currentTask,
            dateEnd: new Date(),
            totalTime: `${spendedTime.hours || 0}:${spendedTime.minutes || 1}`
          }
        )
        .then(() => ctx.reply(`задача ${currentTask.title} закрыта`));
  
      await this.task.delete(currentTask.id)
      
    }
}