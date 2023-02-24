/*
  Warnings:

  - A unique constraint covering the columns `[id,belongToId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_id_belongToId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_belongToId_key" ON "Product"("id", "belongToId");
