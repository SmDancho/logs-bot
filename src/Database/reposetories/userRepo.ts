import { DatabaseService } from '../dbService.service'

export class userRepo extends DatabaseService {
    constructor() {
        super()
    }

    public async isUserExist(telegramId: number): Promise<any>  {
        return this.user.findUnique({
                where: { telegramId: telegramId },
            }
        )
    }

    public async createUser(telegramId: number, name: string) {
        return await this.user.create(
            {
                data: {
                    telegramId: telegramId,
                    name: name,
                }
            }
        )
    }
}