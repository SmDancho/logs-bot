/*
  Warnings:

  - You are about to drop the column `telegramId` on the `EndTasks` table. All the data in the column will be lost.
  - You are about to drop the column `telegramId` on the `currentTask` table. All the data in the column will be lost.
  - Added the required column `userId` to the `EndTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `currentTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EndTasks" DROP COLUMN "telegramId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "currentTask" DROP COLUMN "telegramId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "currentTask" ADD CONSTRAINT "currentTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
