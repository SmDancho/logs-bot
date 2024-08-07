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
    const tasks = await this.task.getFinishTask(ctx)
            
    const createObjectSctructer = tasks.map(
      (task) => {
        const obj:{[key:string]: never[]} = {}
        obj[new Date(task['dateCreated']).toDateString()] = []
        return obj
      }
    )

        
    await Promise.allSettled(
      JSON.parse(JSON.stringify(tasks)).map((task:Itask) => {
        const report = this.createReport(task, createObjectSctructer)
          return report
        }
      )
    )

    const withNoDuplicates = createObjectSctructer.filter((item) => {
      const key = Object.keys(item)
        return item[key[0]].length ?? item 
      }
    )


      if(!tasks || !tasks.length ) {
        ctx.reply('no data found')
      }
      else {
      const json = JSON.parse(JSON.stringify(withNoDuplicates))
      json.forEach(
        (item: Itask[]) => {
          const [value] = Object.entries(item)
          ctx.reply( 
              `${value[0]}

${value[1]}`)
          }
        )
      }
                    
    }
  )
}
  async createReport(task: Itask ,  uniqueArr: { [key: string]: string[] }[] ) {

    if(!task.totalTime) {
      throw Error(`Invalid time value: `);
    }

    const [minutes, seconds] = task.totalTime.split(':').map(Number);
  
 
    const fractionalMinutes = seconds / 60;

    // Combine the minutes and fractional minutes
    const totalMinutes = minutes + fractionalMinutes;
  
    const totalTimeInPercents  = totalMinutes.toFixed(2); 

    const findArr = uniqueArr.find(
      (arr) => Object.keys(arr)[0]
      === new Date(task['dateCreated']).toDateString()
    )
     
    if (!task.dateCreated || !task.dateEnd) {
      throw new Error(`Task ${task.title} dates is undefined`)
    }

    if (!task.totalTime) {
       throw new Error(`Task has no total time`)
    }
 
    const start = timeZone(toDate(task.dateCreated))
    const end = timeZone(toDate(task.dateEnd))

    task.dateCreated = start
    task.dateEnd = end

    if(!findArr) {
      throw new Error('findArr requires')
    }

    const keys = Object.keys(findArr)
    findArr[keys[0]].push(`${task.title} ${task.dateCreated} ${task.dateEnd} ${task.totalTime} ${totalTimeInPercents}\n`)
    return findArr
  }
}