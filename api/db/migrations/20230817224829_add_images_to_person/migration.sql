-- CreateTable
CREATE TABLE "_ImageToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToPerson_AB_unique" ON "_ImageToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToPerson_B_index" ON "_ImageToPerson"("B");

-- AddForeignKey
ALTER TABLE "_ImageToPerson" ADD CONSTRAINT "_ImageToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToPerson" ADD CONSTRAINT "_ImageToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
