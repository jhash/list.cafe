-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "InviteStatus" ADD VALUE 'ACCEPTED';
ALTER TYPE "InviteStatus" ADD VALUE 'DECLINED';

-- AlterTable
ALTER TABLE "UserInvite" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 days';
