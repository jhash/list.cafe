/*
  Warnings:

  - You are about to drop the column `personId` on the `ClothingSizes` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `GiftNotes` table. All the data in the column will be lost.
  - Made the column `giftPreferencesId` on table `ClothingSizes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `giftPreferencesId` on table `GiftNotes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ClothingSizes" DROP CONSTRAINT "ClothingSizes_personId_fkey";

-- DropForeignKey
ALTER TABLE "GiftNotes" DROP CONSTRAINT "GiftNotes_personId_fkey";

-- AlterTable
ALTER TABLE "ClothingSizes" DROP COLUMN "personId",
ALTER COLUMN "giftPreferencesId" SET NOT NULL;

-- AlterTable
ALTER TABLE "GiftNotes" DROP COLUMN "personId",
ALTER COLUMN "giftPreferencesId" SET NOT NULL;
