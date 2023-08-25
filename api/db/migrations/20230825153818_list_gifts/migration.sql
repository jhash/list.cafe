-- AlterEnum
ALTER TYPE "ListType" ADD VALUE 'GIFTS';

-- AlterTable
ALTER TABLE "UserInvite" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 days';
