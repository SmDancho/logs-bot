/*
  Warnings:

  - You are about to drop the column `start` on the `Task` table. All the data in the column will be lost.
  - Added the required column `dateEnd` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "start",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalTime" TEXT NOT NULL;
