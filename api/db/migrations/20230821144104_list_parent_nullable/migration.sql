-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_parentId_fkey";

-- AlterTable
ALTER TABLE "List" ALTER COLUMN "parentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
