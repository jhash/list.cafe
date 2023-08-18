-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "format" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ImageToListItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToListItem_AB_unique" ON "_ImageToListItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToListItem_B_index" ON "_ImageToListItem"("B");

-- AddForeignKey
ALTER TABLE "_ImageToListItem" ADD CONSTRAINT "_ImageToListItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToListItem" ADD CONSTRAINT "_ImageToListItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ListItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
