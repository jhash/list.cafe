-- DropForeignKey
ALTER TABLE "GroupMembership" DROP CONSTRAINT "GroupMembership_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMembership" DROP CONSTRAINT "GroupMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "ListGroupMembership" DROP CONSTRAINT "ListGroupMembership_groupId_fkey";

-- DropForeignKey
ALTER TABLE "ListItemTag" DROP CONSTRAINT "ListItemTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "ListMembership" DROP CONSTRAINT "ListMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "ListTag" DROP CONSTRAINT "ListTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "PartnershipContact" DROP CONSTRAINT "PartnershipContact_addedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "PartnershipContact" DROP CONSTRAINT "PartnershipContact_partnershipId_fkey";

-- DropForeignKey
ALTER TABLE "PartnershipContact" DROP CONSTRAINT "PartnershipContact_personId_fkey";

-- DropForeignKey
ALTER TABLE "PartnershipStatusChange" DROP CONSTRAINT "PartnershipStatusChange_userId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_listItemId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_personId_fkey";

-- DropForeignKey
ALTER TABLE "UserCredential" DROP CONSTRAINT "UserCredential_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- AlterTable
ALTER TABLE "PartnershipContact" ALTER COLUMN "partnershipId" DROP NOT NULL,
ALTER COLUMN "addedByUserId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PartnershipStatusChange" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "listItemId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "personId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCredential" ADD CONSTRAINT "UserCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembership" ADD CONSTRAINT "GroupMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembership" ADD CONSTRAINT "GroupMembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListGroupMembership" ADD CONSTRAINT "ListGroupMembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListMembership" ADD CONSTRAINT "ListMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipStatusChange" ADD CONSTRAINT "PartnershipStatusChange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipContact" ADD CONSTRAINT "PartnershipContact_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipContact" ADD CONSTRAINT "PartnershipContact_partnershipId_fkey" FOREIGN KEY ("partnershipId") REFERENCES "Partnership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipContact" ADD CONSTRAINT "PartnershipContact_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_listItemId_fkey" FOREIGN KEY ("listItemId") REFERENCES "ListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListTag" ADD CONSTRAINT "ListTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItemTag" ADD CONSTRAINT "ListItemTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
