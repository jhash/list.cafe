/*
  Warnings:

  - Added the required column `parentId` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ListType" ADD VALUE 'LINKTREE';

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "parentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
