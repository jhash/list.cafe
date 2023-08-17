-- CreateTable
CREATE TABLE "PartnershipLink" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "partnershipId" INTEGER NOT NULL,

    CONSTRAINT "PartnershipLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartnershipLink" ADD CONSTRAINT "PartnershipLink_partnershipId_fkey" FOREIGN KEY ("partnershipId") REFERENCES "Partnership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
