-- AlterTable
ALTER TABLE "UserInvite" ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 days';
