import { Telegraf } from 'telegraf'
import { Command } from "../command.class"
import type {IBotContext} from "../../types/interfaces"
import { taskRepo } from '../../Database/reposetories/taskRepo'
import { toDate  } from 'date-fns'
import { Itask } from '../../types/interfaces'
import { timeZone } from '../../utils/timezone'

export class ReportComand extends Command {
    task: taskRepo

    constructor(bot:Telegraf<IBotContext>) {
        super(bot);
        this.task = new taskRepo()
    }

    handleCommand(): void {
    this.bot.command('report', async (ctx: IBotContext) => {
        const tasks = await this.task.getFInishTask()
        
        const json = JSON.parse(JSON.stringify(tasks)).map((task:Itask) => {
              
            if (!task.dateCreated || !task.dateEnd) {
                throw new Error(`Task ${task.title} dates is undefined`)
            }

            const start = timeZone(toDate(task.dateCreated))
            const end = timeZone(toDate(task.dateEnd))

            const taskObj: Itask =  {
                ...task,
                title: task.title,
                dateCreated: start,
                dateEnd: end,
            }
         
            if (!taskObj.totalTime) {
                throw new Error(`Task has no total time`)
            }

            const countHoursValue = taskObj.totalTime.replace(':', ',').split(',')
            return `${taskObj.title} ${taskObj.dateCreated} ${taskObj.dateEnd} ${taskObj.totalTime} ${countHoursValue[0]}.${countHoursValue[1]}\n`
            
        }
        )

        if(!tasks || !tasks.length ) {
            ctx.reply('no data found')
        }
        else {
            ctx.reply(`tasks for ${tasks[0].dateEnd}: \n \n${json}`)
        }
    
    }
    )
    }
}