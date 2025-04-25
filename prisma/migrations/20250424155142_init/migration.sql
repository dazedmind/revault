-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT,
    "mid_name" TEXT,
    "last_name" TEXT,
    "ext_name" TEXT,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "facilitators" (
    "employee_id" SERIAL NOT NULL,
    "position" TEXT,
    "department" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "facilitators_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "students" (
    "student_num" BIGINT NOT NULL,
    "program" TEXT,
    "college" TEXT,
    "year_level" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("student_num")
);

-- CreateTable
CREATE TABLE "papers" (
    "paper_id" SERIAL NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "year" INTEGER,
    "date" TIMESTAMP(3),
    "keywords" TEXT,
    "tags" TEXT,
    "abstract" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "papers_pkey" PRIMARY KEY ("paper_id")
);

-- CreateTable
CREATE TABLE "paper_metadata" (
    "metadata_id" SERIAL NOT NULL,
    "paper_id" INTEGER NOT NULL,
    "type" TEXT,
    "format" TEXT,
    "language" TEXT,
    "source" TEXT,
    "rights" TEXT,

    CONSTRAINT "paper_metadata_pkey" PRIMARY KEY ("metadata_id")
);

-- CreateTable
CREATE TABLE "user_bookmarks" (
    "bookmark_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "paper_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_bookmarks_pkey" PRIMARY KEY ("bookmark_id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "facilitators_user_id_key" ON "facilitators"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_student_num_key" ON "students"("student_num");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_bookmarks_user_id_paper_id_key" ON "user_bookmarks"("user_id", "paper_id");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_email_key" ON "Otp"("email");

-- AddForeignKey
ALTER TABLE "facilitators" ADD CONSTRAINT "facilitators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paper_metadata" ADD CONSTRAINT "paper_metadata_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "papers"("paper_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "papers"("paper_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
