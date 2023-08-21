-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_parentId_fkey";

-- AlterTable
ALTER TABLE "ListItem" ALTER COLUMN "parentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
