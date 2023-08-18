-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('GENERIC', 'FRIENDS', 'FAMILY', 'COMPANY', 'NON_PROFIT');

-- CreateEnum
CREATE TYPE "GroupVisibility" AS ENUM ('PRIVATE', 'INVITE', 'LINK', 'PUBLIC');

-- AlterEnum
ALTER TYPE "ListType" ADD VALUE 'JOBS';

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "type" "GroupType" NOT NULL DEFAULT 'GENERIC',
ADD COLUMN     "visibility" "GroupVisibility" NOT NULL DEFAULT 'PRIVATE';
