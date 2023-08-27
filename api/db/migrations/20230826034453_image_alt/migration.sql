-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "alt" TEXT;

-- AlterTable
ALTER TABLE "UserInvite" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 days';
