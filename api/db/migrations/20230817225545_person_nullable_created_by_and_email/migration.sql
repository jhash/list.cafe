-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_createdByUserId_fkey";

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "createdByUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
