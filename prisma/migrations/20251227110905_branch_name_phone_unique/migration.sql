/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `branch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "branch_name_key" ON "branch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "branch_phone_key" ON "branch"("phone");
