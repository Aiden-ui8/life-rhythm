/*
  Warnings:

  - A unique constraint covering the columns `[habitId,date]` on the table `Habit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habitId` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "habitId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Habit_habitId_date_key" ON "Habit"("habitId", "date");
