import { DatabaseService } from '../dbService.service'
import { intervalToDuration } from "date-fns";
import { Itask,IBotContext  } from '../../types/interfaces';


export class taskRepo extends DatabaseService {
    
    constructor() {
        super()
    }

    public async create(data: Itask, ctx: IBotContext) {
        const existTask = await this.getActieveTask(ctx)
    
        if (existTask && existTask.dateCreated) {
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

            await this.delete(existTask.id as number)
        }

        return this.currentTask.create({
                data 
            }
        )
    }

    public async close(data: Itask): Promise<Itask> {

        if (!data.totalTime && typeof data.totalTime !== "string") {
            throw new Error('total time is not valid');
        }

        return this.endTasks.create({
            data: {
                ...data,
                totalTime: data.totalTime,
                dateCreated: data.dateCreated, 
            }
        });
    }

    public async getActieveTask(ctx: IBotContext): Promise<Itask | null> {
        return this.currentTask.findFirst(
            {
                where: {
                    userId: ctx.from?.id,
                }
            }
        )
    }

    public async getFinishTask(ctx: IBotContext): Promise<Itask[]> {
        return this.endTasks.findMany({
            where: {
                userId: ctx.from?.id,
            }
        })
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