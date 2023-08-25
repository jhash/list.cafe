/*
  Warnings:

  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_listItemId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_purchasedById_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_reservationId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "price" MONEY,
ADD COLUMN     "status" "ReservationStatus" NOT NULL DEFAULT 'RESERVED';

-- AlterTable
ALTER TABLE "UserInvite" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 days';

-- DropTable
DROP TABLE "Purchase";

-- DropEnum
DROP TYPE "PurchaseStatus";
