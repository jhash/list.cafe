-- CreateEnum
CREATE TYPE "PartnershipStatus" AS ENUM ('QUEUED', 'CONTACTING', 'SELLING', 'NEGOTIATING', 'SIGNING', 'SUCCESSFUL', 'UNSUCCESSFUL');

-- CreateTable
CREATE TABLE "Partnership" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "status" "PartnershipStatus" NOT NULL DEFAULT 'QUEUED',
    "url" TEXT NOT NULL,

    CONSTRAINT "Partnership_pkey" PRIMARY KEY ("id")
);
