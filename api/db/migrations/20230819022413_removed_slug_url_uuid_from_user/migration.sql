/*
  Warnings:

  - You are about to drop the column `slug` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ListType" ADD VALUE 'WEDDING';
ALTER TYPE "ListType" ADD VALUE 'BABY_SHOWER';

-- DropIndex
DROP INDEX "User_slug_key";

-- DropIndex
DROP INDEX "User_url_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "slug",
DROP COLUMN "url",
DROP COLUMN "uuid";
