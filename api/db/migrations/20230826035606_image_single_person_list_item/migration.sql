/*
  Warnings:

  - You are about to drop the `_ImageToListItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImageToPerson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ImageToListItem" DROP CONSTRAINT "_ImageToListItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToListItem" DROP CONSTRAINT "_ImageToListItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToPerson" DROP CONSTRAINT "_ImageToPerson_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToPerson" DROP CONSTRAINT "_ImageToPerson_B_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "listItemId" INTEGER,
ADD COLUMN     "personId" INTEGER;

-- AlterTable
ALTER TABLE "UserInvite" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 days';

-- DropTable
DROP TABLE "_ImageToListItem";

-- DropTable
DROP TABLE "_ImageToPerson";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_listItemId_fkey" FOREIGN KEY ("listItemId") REFERENCES "ListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
