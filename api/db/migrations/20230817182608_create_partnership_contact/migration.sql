-- CreateTable
CREATE TABLE "PartnershipContact" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" INTEGER NOT NULL,
    "partnershipId" INTEGER NOT NULL,
    "addedByUserId" INTEGER NOT NULL,

    CONSTRAINT "PartnershipContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnershipContact_personId_key" ON "PartnershipContact"("personId");

-- AddForeignKey
ALTER TABLE "PartnershipContact" ADD CONSTRAINT "PartnershipContact_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipContact" ADD CONSTRAINT "PartnershipContact_partnershipId_fkey" FOREIGN KEY ("partnershipId") REFERENCES "Partnership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipContact" ADD CONSTRAINT "PartnershipContact_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
