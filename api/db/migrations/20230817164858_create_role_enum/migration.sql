-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SUPPORT', 'ADMIN');

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
