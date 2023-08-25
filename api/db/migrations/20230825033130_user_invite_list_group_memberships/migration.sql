-- AlterTable
ALTER TABLE "UserInvite" ADD COLUMN     "groupMembershipId" INTEGER,
ADD COLUMN     "listMembershipId" INTEGER,
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 days';

-- AddForeignKey
ALTER TABLE "UserInvite" ADD CONSTRAINT "UserInvite_listMembershipId_fkey" FOREIGN KEY ("listMembershipId") REFERENCES "ListMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInvite" ADD CONSTRAINT "UserInvite_groupMembershipId_fkey" FOREIGN KEY ("groupMembershipId") REFERENCES "GroupMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
