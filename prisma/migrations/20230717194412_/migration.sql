-- CreateTable
CREATE TABLE "SESSIONS" (
    "session" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "USERS" (
    "USERNAME" TEXT NOT NULL PRIMARY KEY,
    "PASSWORD" TEXT,
    "ORDERS" TEXT,
    "PFP" TEXT
);

-- CreateTable
CREATE TABLE "PRODUCTS" (
    "NAME" TEXT NOT NULL PRIMARY KEY,
    "PRICE" DECIMAL,
    "TYPE" TEXT,
    "STOCK" INTEGER,
    "FLOWERS" TEXT,
    "COLOR" TEXT
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_SESSIONS_1" ON "SESSIONS"("session");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_PRODUCTS_1" ON "PRODUCTS"("NAME");
Pragma writable_schema=0;
