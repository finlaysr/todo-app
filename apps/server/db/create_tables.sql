CREATE TABLE "tasks" (
	"id"	INTEGER NOT NULL UNIQUE,
	"title"	TEXT NOT NULL,
	"description"	TEXT,
	"completed"	INTEGER NOT NULL DEFAULT 0 CHECK("completed" IN (0,1)),
	PRIMARY KEY("id" AUTOINCREMENT)
);