-- CreateTable
CREATE TABLE "Identifier" (
    "id" TEXT NOT NULL,
    "personId" INTEGER,
    "listId" INTEGER,
    "groupId" INTEGER,

    CONSTRAINT "Identifier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Identifier_personId_key" ON "Identifier"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Identifier_listId_key" ON "Identifier"("listId");

-- CreateIndex
CREATE UNIQUE INDEX "Identifier_groupId_key" ON "Identifier"("groupId");

-- AddForeignKey
ALTER TABLE "Identifier" ADD CONSTRAINT "Identifier_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identifier" ADD CONSTRAINT "Identifier_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identifier" ADD CONSTRAINT "Identifier_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
