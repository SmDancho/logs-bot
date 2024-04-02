/*
  Warnings:

  - You are about to drop the column `userId` on the `EndTasks` table. All the data in the column will be lost.
  - Added the required column `telegramId` to the `EndTasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EndTasks" DROP CONSTRAINT "EndTasks_userId_fkey";

-- AlterTable
ALTER TABLE "EndTasks" DROP COLUMN "userId",
ADD COLUMN     "telegramId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "currentTask" ALTER COLUMN "dateCreated" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "EndTasks" ADD CONSTRAINT "EndTasks_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
