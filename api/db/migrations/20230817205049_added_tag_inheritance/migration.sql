/*
  Warnings:

  - A unique constraint covering the columns `[parentTagId,name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tag_name_key";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "parentTagId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_parentTagId_name_key" ON "Tag"("parentTagId", "name");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_parentTagId_fkey" FOREIGN KEY ("parentTagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
