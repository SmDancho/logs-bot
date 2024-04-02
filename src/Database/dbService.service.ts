import { PrismaClient } from "@prisma/client";

export class DatabaseService extends PrismaClient {
    
    constructor() {
        super()
    }

    $connect(): Promise<void> {
        return this.$connect()
    }

    $disconnect(): Promise<void> {
        return this.$disconnect()    
    }

}