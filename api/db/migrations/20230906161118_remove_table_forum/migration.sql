/*
  Warnings:

  - The values [FORUM,TABLE] on the enum `ListType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ListType_new" AS ENUM ('GIFTS', 'WISHLIST', 'WEDDING', 'BABY_SHOWER', 'TOP', 'BOOKMARKS', 'SOCIAL', 'FAVORITES', 'AWESOME', 'INVENTORY', 'TODO', 'LINKTREE', 'JOBS', 'SCHOOL', 'SHOPPING', 'GROCERIES', 'IDEAS');
ALTER TABLE "List" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "List" ALTER COLUMN "type" TYPE "ListType_new" USING ("type"::text::"ListType_new");
ALTER TYPE "ListType" RENAME TO "ListType_old";
ALTER TYPE "ListType_new" RENAME TO "ListType";
DROP TYPE "ListType_old";
ALTER TABLE "List" ALTER COLUMN "type" SET DEFAULT 'WISHLIST';
COMMIT;
