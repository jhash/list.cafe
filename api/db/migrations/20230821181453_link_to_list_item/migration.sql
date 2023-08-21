/*
  Warnings:

  - You are about to drop the column `partnershipId` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[listItemId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_partnershipId_fkey";

-- DropIndex
DROP INDEX "Link_partnershipId_key";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "partnershipId",
ADD COLUMN     "listItemId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Link_listItemId_key" ON "Link"("listItemId");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_listItemId_fkey" FOREIGN KEY ("listItemId") REFERENCES "ListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
