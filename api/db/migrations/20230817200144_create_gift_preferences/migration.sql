-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- CreateTable
CREATE TABLE "GiftPreferences" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" INTEGER NOT NULL,
    "addedByUserId" INTEGER NOT NULL,

    CONSTRAINT "GiftPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingSizes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "giftPreferencesId" INTEGER,
    "personId" INTEGER NOT NULL,
    "shoeSize" TEXT,
    "shirt" TEXT,
    "pants" TEXT,
    "jacket" TEXT,
    "dress" TEXT,
    "hat" TEXT,

    CONSTRAINT "ClothingSizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftNotes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "giftPreferencesId" INTEGER,
    "personId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "GiftNotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClothingSizes_giftPreferencesId_key" ON "ClothingSizes"("giftPreferencesId");

-- CreateIndex
CREATE UNIQUE INDEX "GiftNotes_giftPreferencesId_key" ON "GiftNotes"("giftPreferencesId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftPreferences" ADD CONSTRAINT "GiftPreferences_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftPreferences" ADD CONSTRAINT "GiftPreferences_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingSizes" ADD CONSTRAINT "ClothingSizes_giftPreferencesId_fkey" FOREIGN KEY ("giftPreferencesId") REFERENCES "GiftPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingSizes" ADD CONSTRAINT "ClothingSizes_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftNotes" ADD CONSTRAINT "GiftNotes_giftPreferencesId_fkey" FOREIGN KEY ("giftPreferencesId") REFERENCES "GiftPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftNotes" ADD CONSTRAINT "GiftNotes_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
