-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('VIEW', 'EDIT', 'ADMIN', 'OWNER');

-- AlterTable
ALTER TABLE "GroupMembership" ADD COLUMN     "groupRole" "GroupRole" NOT NULL DEFAULT 'VIEW';
