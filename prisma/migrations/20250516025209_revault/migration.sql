-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT,
    "mid_name" TEXT,
    "last_name" TEXT,
    "ext_name" TEXT,
    "email" TEXT NOT NULL,
    "profile_picture" TEXT,
    "role" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "faculty" (
    "employee_id" INTEGER NOT NULL,
    "position" TEXT,
    "department" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("employee_id")
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
CREATE TABLE "librarian" (
    "employee_id" INTEGER NOT NULL,
    "position" TEXT,
    "contact_num" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "librarian_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "papers" (
    "paper_id" SERIAL NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "year" INTEGER,
    "department" TEXT,
    "keywords" TEXT[],
    "course" TEXT,
    "abstract" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "paper_url" TEXT,

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

-- CreateTable
CREATE TABLE "paper_bm25_index" (
    "index_id" SERIAL NOT NULL,
    "paper_id" INTEGER NOT NULL,
    "token_frequencies" JSONB NOT NULL,
    "document_length" INTEGER NOT NULL,

    CONSTRAINT "paper_bm25_index_pkey" PRIMARY KEY ("index_id")
);

-- CreateTable
CREATE TABLE "term_score" (
    "id" SERIAL NOT NULL,
    "term" TEXT NOT NULL,
    "tf" DOUBLE PRECISION NOT NULL,
    "tfidf" DOUBLE PRECISION NOT NULL,
    "bm25" DOUBLE PRECISION NOT NULL,
    "paper_id" INTEGER NOT NULL,

    CONSTRAINT "term_score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "employee_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "global_stats" (
    "id" SERIAL NOT NULL,
    "total_docs" INTEGER NOT NULL,
    "avg_doc_length" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "global_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "faculty_employee_id_key" ON "faculty"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "faculty_user_id_key" ON "faculty"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_student_num_key" ON "students"("student_num");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "librarian_employee_id_key" ON "librarian"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "librarian_user_id_key" ON "librarian"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_bookmarks_user_id_paper_id_key" ON "user_bookmarks"("user_id", "paper_id");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_email_key" ON "Otp"("email");

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "librarian" ADD CONSTRAINT "librarian_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paper_metadata" ADD CONSTRAINT "paper_metadata_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "papers"("paper_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "papers"("paper_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paper_bm25_index" ADD CONSTRAINT "paper_bm25_index_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "papers"("paper_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "term_score" ADD CONSTRAINT "term_score_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "papers"("paper_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "librarian"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;
