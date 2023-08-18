/*
  Warnings:

  - Added the required column `parentId` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListItem" ADD COLUMN     "parentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ListItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
