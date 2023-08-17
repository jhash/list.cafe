-- CreateTable
CREATE TABLE "ListView" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "listId" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "ListView_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListView" ADD CONSTRAINT "ListView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListView" ADD CONSTRAINT "ListView_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
