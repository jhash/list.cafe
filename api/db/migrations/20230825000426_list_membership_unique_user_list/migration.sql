/*
  Warnings:

  - A unique constraint covering the columns `[listId,userId]` on the table `ListMembership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ListMembership_listId_userId_key" ON "ListMembership"("listId", "userId");
