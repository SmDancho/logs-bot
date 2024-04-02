import { DatabaseService } from '../dbService.service'
import { intervalToDuration } from "date-fns";
import { Itask,IBotContext  } from '../../types/interfaces';

export class taskRepo extends DatabaseService {
    constructor() {
        super()
    }

    public async create(data: Itask, ctx: IBotContext) {
        const existTask = await this.getActieveTask(ctx)

        if (existTask) {
            const spendedTime = intervalToDuration(
                {
                  start: existTask.dateCreated, 
                  end: new Date()
                }
              );
        
              await this.close(
                  {
                    ...existTask,
                    dateEnd: new Date(),
                    status: "DONE",
                    totalTime: `${spendedTime.hours || 0}:${spendedTime.minutes || 1}`
                  }
                )
                .then(() => ctx.reply(`задача ${existTask.title} закрыта`));

            await this.delete(existTask.id)
        }

        return this.currentTask.create({
                data 
            }
        )
    }

    public async close(data:any) {
        return this.endTasks.create({
                data
            }
        )
    }

    public async getActieveTask(ctx: any): Promise<any> {
        return this.currentTask.findFirst(
            {
                where: {
                    userId: ctx.from.id,
                }
            }
        )
    }

    public async getFInishTask(): Promise<any> {
        return this.endTasks.findMany()
    }

    public async delete(id:number) {
        return this.currentTask.delete({
                where: {
                    id
                }
            }
        )
    }
}