// src/lib/PapersReport.tsx

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

type Paper = {
  paper_id: number;
  title: string;
  author: string; // raw string of authors, separated by two spaces
  year: number;
  department: string;
};

type Props = {
  papers: Paper[];
};

/** How many data-rows per page (counting each row as a single “chunk”). */
const ROWS_PER_PAGE = 25;

const styles = StyleSheet.create({
  body: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingVertical: 20,
    paddingHorizontal: 40,
    color: "#000",
  },

  // This headerContainer will be pinned at the top of every page:
  headerContainer: {
    marginBottom: 12,
    textAlign: "center" as const,
    backgroundColor: "#7f8caa",
    padding: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold" as const,
    color: "#fff",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 2,
  },
  headerDate: {
    fontSize: 10,
    color: "#fff",
  },

  table: {
    width: "auto",
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: "row" as const,
    borderBottom: "2pt solid #0074cc",
    backgroundColor: "#0074cc",
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold" as const,
    paddingVertical: 6,
    // We do NOT set wrap:false here on the header, because we want it to stay on every page
  },

  tableRow: {
    flexDirection: "row" as const,
    borderBottom: "1pt solid #444",
    alignItems: "center" as const,
    fontSize: 10,
    paddingVertical: 4,

    // ← THIS is key: if a single row would overflow the page,
    //     React-PDF will push the entire row to the next page.
    wrap: false as const,
  },

  colNum: {
    width: "8%",
    textAlign: "center" as const,
    fontWeight: "bold" as const,
  },
  colTitle: {
    width: "50%",
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
  },
  colAuthors: {
    width: "35%",
    paddingLeft: 10,
  },
  colYear: {
    width: "10%",
    textAlign: "center" as const,
    fontWeight: "bold" as const,
  },
  authorsText: {
    lineHeight: 1.2,
  },
});

const PapersReport: React.FC<Props> = ({ papers }) => {
  // 1) Split `papers` into pages of ROWS_PER_PAGE each:
  const chunkedPapers: Paper[][] = [];
  for (let i = 0; i < papers.length; i += ROWS_PER_PAGE) {
    chunkedPapers.push(papers.slice(i, i + ROWS_PER_PAGE));
  }

  return (
    <Document>
      {chunkedPapers.map((chunk, pageIndex) => (
        <Page size="A4" style={styles.body} wrap={false} key={pageIndex}>
          {/* ─── HEADER – pinned at top of every page ────────────────── */}
          <View style={styles.headerContainer} fixed>
            <Text style={styles.headerTitle}>
              PAMANTASAN NG LUNGSOD NG MAYNILA
            </Text>
            <Text style={styles.headerSubtitle}>
              College of Information Systems and Technology Management
            </Text>
            <Text style={styles.headerDate}>
              Generated on {new Date().toLocaleDateString()}
            </Text>
          </View>

          {/* ─── TABLE ───────────────────────────────────────────────── */}
          <View style={styles.table}>
            {/* Table Header (repeated on every page) */}
            <View style={styles.tableHeader}>
              <Text style={styles.colNum}>#</Text>
              <Text style={styles.colTitle}>RESEARCH TITLE</Text>
              <Text style={styles.colAuthors}>AUTHORS</Text>
              <Text style={styles.colYear}>YEAR</Text>
            </View>

            {/* Rows for this page (each uses wrap=false) */}
            {chunk.map((p, idx) => {
              // 1) Split raw author string on double-spaces:
              const rawAuthors = p.author || "";
              const authorChunks = rawAuthors
                .split("  ")
                .map((a) => a.trim())
                .filter((a) => a !== "");

              // 2) Flip “Last, First” → “First Last”:
              const formattedAuthors = authorChunks.map((a) => {
                const parts = a.split(",");
                if (parts.length === 2) {
                  return `${parts[1].trim()} ${parts[0].trim()}`;
                }
                return a;
              });

              // 3) Number each author on its own line:
              const numberedAuthors = formattedAuthors
                .map((name, i) => `${i + 1}. ${name}`)
                .join("\n");

              return (
                <View style={styles.tableRow} key={p.paper_id}>
                  <Text style={styles.colNum}>
                    {pageIndex * ROWS_PER_PAGE + idx + 1}
                  </Text>
                  <Text style={styles.colTitle}>{p.title || ""}</Text>
                  <Text
                    style={[styles.colAuthors, styles.authorsText]}
                    wrap={false} // ensure the author cell doesn't split across pages
                  >
                    {numberedAuthors}
                  </Text>
                  <Text style={styles.colYear}>{p.year || ""}</Text>
                </View>
              );
            })}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default PapersReport;
