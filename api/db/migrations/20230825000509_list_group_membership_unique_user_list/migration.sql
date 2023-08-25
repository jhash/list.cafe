/*
  Warnings:

  - A unique constraint covering the columns `[listId,groupId]` on the table `ListGroupMembership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ListGroupMembership_listId_groupId_key" ON "ListGroupMembership"("listId", "groupId");
