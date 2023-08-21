/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkStatusChange` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PartnershipLinkStatus" AS ENUM ('PENDING', 'DIGESTING', 'SUCCESSFUL', 'UNSUCCESSFUL');

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_listItemId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_partnershipId_fkey";

-- DropForeignKey
ALTER TABLE "LinkStatusChange" DROP CONSTRAINT "LinkStatusChange_changedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "LinkStatusChange" DROP CONSTRAINT "LinkStatusChange_linkId_fkey";

-- DropTable
DROP TABLE "Link";

-- DropTable
DROP TABLE "LinkStatusChange";

-- DropEnum
DROP TYPE "LinkStatus";

-- CreateTable
CREATE TABLE "PartnershipLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PartnershipLinkStatus" NOT NULL DEFAULT 'PENDING',
    "originalUrl" TEXT NOT NULL,
    "partnershipId" INTEGER,
    "listItemId" INTEGER,
    "createdByUserId" INTEGER,

    CONSTRAINT "PartnershipLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnershipLinkStatusChange" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" "PartnershipLinkStatus" NOT NULL,
    "to" "PartnershipLinkStatus" NOT NULL,
    "notes" TEXT NOT NULL,
    "changedByUserId" INTEGER,
    "partnershipLinkId" TEXT NOT NULL,

    CONSTRAINT "PartnershipLinkStatusChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnershipLink_partnershipId_key" ON "PartnershipLink"("partnershipId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnershipLink_listItemId_key" ON "PartnershipLink"("listItemId");

-- AddForeignKey
ALTER TABLE "PartnershipLink" ADD CONSTRAINT "PartnershipLink_partnershipId_fkey" FOREIGN KEY ("partnershipId") REFERENCES "Partnership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipLink" ADD CONSTRAINT "PartnershipLink_listItemId_fkey" FOREIGN KEY ("listItemId") REFERENCES "ListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipLink" ADD CONSTRAINT "PartnershipLink_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipLinkStatusChange" ADD CONSTRAINT "PartnershipLinkStatusChange_changedByUserId_fkey" FOREIGN KEY ("changedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipLinkStatusChange" ADD CONSTRAINT "PartnershipLinkStatusChange_partnershipLinkId_fkey" FOREIGN KEY ("partnershipLinkId") REFERENCES "PartnershipLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
