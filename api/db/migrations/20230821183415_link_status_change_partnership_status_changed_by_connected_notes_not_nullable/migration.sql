/*
  Warnings:

  - You are about to drop the column `userId` on the `PartnershipStatusChange` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[partnershipId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `notes` to the `PartnershipStatusChange` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partnershipId` to the `PartnershipStatusChange` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LinkStatus" AS ENUM ('PENDING', 'DIGESTING', 'SUCCESSFUL', 'UNSUCCESSFUL');

-- DropForeignKey
ALTER TABLE "PartnershipStatusChange" DROP CONSTRAINT "PartnershipStatusChange_userId_fkey";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "createdByUserId" INTEGER,
ADD COLUMN     "partnershipId" INTEGER,
ADD COLUMN     "status" "LinkStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "PartnershipStatusChange" DROP COLUMN "userId",
ADD COLUMN     "changedByUserId" INTEGER,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "partnershipId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "LinkStatusChange" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" "LinkStatus" NOT NULL,
    "to" "LinkStatus" NOT NULL,
    "notes" TEXT NOT NULL,
    "changedByUserId" INTEGER,
    "linkId" TEXT NOT NULL,

    CONSTRAINT "LinkStatusChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_partnershipId_key" ON "Link"("partnershipId");

-- AddForeignKey
ALTER TABLE "PartnershipStatusChange" ADD CONSTRAINT "PartnershipStatusChange_changedByUserId_fkey" FOREIGN KEY ("changedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipStatusChange" ADD CONSTRAINT "PartnershipStatusChange_partnershipId_fkey" FOREIGN KEY ("partnershipId") REFERENCES "Partnership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_partnershipId_fkey" FOREIGN KEY ("partnershipId") REFERENCES "Partnership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkStatusChange" ADD CONSTRAINT "LinkStatusChange_changedByUserId_fkey" FOREIGN KEY ("changedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkStatusChange" ADD CONSTRAINT "LinkStatusChange_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
