-- CreateTable
CREATE TABLE "PartnershipStatusChange" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" "PartnershipStatus" NOT NULL,
    "to" "PartnershipStatus" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PartnershipStatusChange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartnershipStatusChange" ADD CONSTRAINT "PartnershipStatusChange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
