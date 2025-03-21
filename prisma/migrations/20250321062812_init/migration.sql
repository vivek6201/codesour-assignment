-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "regNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "rollNo" INTEGER NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_regNo_key" ON "Student"("regNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNo_class_key" ON "Student"("rollNo", "class");
