-- CreateTable
CREATE TABLE "branch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "doctor_name_idx" ON "doctor"("name");

-- CreateIndex
CREATE INDEX "doctor_branchId_idx" ON "doctor"("branchId");

-- CreateIndex
CREATE INDEX "doctor_branchId_name_idx" ON "doctor"("branchId", "name");

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
