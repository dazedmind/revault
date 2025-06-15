// src/lib/PapersReport.tsx

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

type Paper = {
  paper_id: number;
  title: string;
  author: string; // raw string of authors, separated by two spaces
  year: number;
  department: string;
};

type Props = {
  papers: Paper[];
  filters?: {
    department?: string;
    course?: string;
    sort?: string;
  };
};

/** How many data-rows per page for A4 size (accounting for smaller page height). */
const ROWS_PER_PAGE = 18;

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 70,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 50,
    lineHeight: 1.4,
  },

  // Header container - pinned at the top of every page
  headerContainer: {
    position: "absolute",
    top: 15,
    left: 30,
    right: 30,
    textAlign: "center",
    borderBottom: "2px solid #000",
    paddingBottom: 8,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerDate: {
    fontSize: 9,
    color: "#666",
    marginBottom: 8,
  },

  // Report title
  reportTitle: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
  },

  // Summary statistics section
  summaryContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 15,
    border: "1px solid #ccc",
  },
  summaryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 9,
    fontWeight: "bold",
  },
  summaryValue: {
    fontSize: 9,
  },

  // Filter information section
  filterInfo: {
    backgroundColor: "#f8f9fa",
    padding: 8,
    marginBottom: 15,
    border: "1px solid #ddd",
  },
  filterTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  filterText: {
    fontSize: 9,
    color: "#666",
    marginBottom: 2,
  },

  // Table styles
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottom: "2px solid #000",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 4,
    paddingHorizontal: 3,
    minHeight: 28,
    maxHeight: 40,
    wrap: false, // Prevent row from breaking across pages
    break: false, // Ensure entire row moves to next page if it doesn't fit
    orphans: 0, // Prevent orphaned parts of rows
    widows: 0, // Prevent widow parts of rows
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 4,
    paddingHorizontal: 3,
    backgroundColor: "#f9f9f9",
    minHeight: 28,
    maxHeight: 40,
    wrap: false,
    break: false, // Ensure entire row moves to next page if it doesn't fit
    orphans: 0,
    widows: 0,
  },

  // Header cells
  headerCell: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 2,
  },

  // Data cells
  cell: {
    fontSize: 8,
    textAlign: "left",
    paddingHorizontal: 2,
    paddingVertical: 2,
    lineHeight: 1.1,
    overflow: "hidden",
    wrap: false, // Prevent text wrapping within cells that could cause row overflow
  },

  // Column widths (adjusted for A4 size)
  colNum: {
    width: "6%",
    textAlign: "center",
    fontWeight: "bold",
  },
  colTitle: {
    width: "45%",
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: "bold",
  },
  colAuthors: {
    width: "28%",
    paddingLeft: 3,
    paddingRight: 3,
  },
  colDepartment: {
    width: "11%",
    textAlign: "center",
  },
  colYear: {
    width: "10%",
    textAlign: "center",
    fontWeight: "bold",
  },

  // Special text styles
  authorsText: {
    lineHeight: 1.1,
    wrap: false,
    overflow: "hidden",
  },
  titleText: {
    fontWeight: "bold",
    lineHeight: 1.1,
    overflow: "hidden",
  },

  // Footer - REMOVED
  // footerContainer: {
  //   position: "absolute",
  //   bottom: 15,
  //   left: 30,
  //   right: 30,
  //   textAlign: "center",
  //   borderTop: "1px solid #ddd",
  //   paddingTop: 4,
  // },
  // footerText: {
  //   fontSize: 8,
  //   color: "#666",
  // },
  // pageNumber: {
  //   fontSize: 8,
  //   color: "#666",
  //   textAlign: "right",
  //   marginTop: 5,
  // },
});

const PapersReport: React.FC<Props> = ({ papers, filters }) => {
  // 1) Split `papers` into pages of ROWS_PER_PAGE each:
  const chunkedPapers: Paper[][] = [];
  for (let i = 0; i < papers.length; i += ROWS_PER_PAGE) {
    chunkedPapers.push(papers.slice(i, i + ROWS_PER_PAGE));
  }

  // Helper functions for summary statistics
  const getDepartmentCounts = () => {
    const counts: Record<string, number> = {};
    papers.forEach((paper) => {
      const dept = paper.department || "Unknown";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return counts;
  };

  const getYearRange = () => {
    if (papers.length === 0) return "N/A";
    const years = papers.map((p) => p.year).filter((y) => y && y > 0);
    if (years.length === 0) return "N/A";
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return minYear === maxYear ? `${minYear}` : `${minYear} - ${maxYear}`;
  };

  const getMostCommonDepartment = () => {
    const deptCounts = getDepartmentCounts();
    if (Object.keys(deptCounts).length === 0) return "N/A";
    return Object.entries(deptCounts).reduce((a, b) =>
      deptCounts[a[0]] > deptCounts[b[0]] ? a : b,
    )[0];
  };

  const truncateText = (text: string, maxLength: number = 30) => {
    if (!text || text.length <= maxLength) return text || "";
    return text.substring(0, maxLength) + "...";
  };

  const departmentCounts = getDepartmentCounts();

  // Helper function to format filter display
  const formatFilters = () => {
    if (!filters) return null;

    const hasFilters =
      filters.department ||
      filters.course ||
      (filters.sort && filters.sort !== "recent");

    if (!hasFilters) {
      return {
        title: "Applied Filters",
        info: [
          "Department Filter: All Departments",
          "Course Filter: All Courses",
          "Sort Order: Most Recent (Default)",
          "Status: No filters applied - showing all papers",
        ],
      };
    }

    const filterInfo = [];

    if (filters.department) {
      filterInfo.push(
        `Department Filter: ${filters.department.split(",").join(", ")}`,
      );
    } else {
      filterInfo.push("Department Filter: All Departments");
    }

    if (filters.course) {
      filterInfo.push(`Course Filter: ${filters.course.split(",").join(", ")}`);
    } else {
      filterInfo.push("Course Filter: All Courses");
    }

    const sortLabels: Record<string, string> = {
      "title-asc": "Paper Title (A-Z)",
      "title-desc": "Paper Title (Z-A)",
      "year-recent": "Publish Year (Most Recent)",
      "year-oldest": "Publish Year (Oldest)",
      recent: "Most Recent (Default)",
    };

    const sortLabel =
      sortLabels[filters.sort || "recent"] ||
      filters.sort ||
      "Most Recent (Default)";
    filterInfo.push(`Sort Order: ${sortLabel}`);

    filterInfo.push(
      `Status: ${hasFilters ? "Filtered results" : "All papers shown"}`,
    );

    return {
      title: "Applied Filters",
      info: filterInfo,
    };
  };

  const filterData = formatFilters();

  return (
    <Document>
      {chunkedPapers.map((chunk, pageIndex) => (
        <Page
          size="A4"
          style={styles.page}
          orientation="portrait"
          wrap={false}
          key={pageIndex}
        >
          {/* ─── HEADER – pinned at top of every page ────────────────── */}
          <View style={styles.headerContainer} fixed>
            <Text style={styles.headerTitle}>
              PAMANTASAN NG LUNGSOD NG MAYNILA
            </Text>
            <Text style={styles.headerSubtitle}>
              College of Information Systems and Technology Management
            </Text>
            <Text style={styles.headerDate}>
              Generated on {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString()}
            </Text>
          </View>

          {/* Report Title */}
          <View>
            <Text style={styles.reportTitle}>Research Papers Report</Text>
          </View>

          {/* Filter Information - only on first page */}
          {pageIndex === 0 && filterData && (
            <View style={styles.filterInfo}>
              <Text style={styles.filterTitle}>{filterData.title}:</Text>
              {filterData.info.map((item, index) => (
                <Text key={index} style={styles.filterText}>
                  {item}
                </Text>
              ))}
            </View>
          )}

          {/* Summary Statistics - only on first page */}
          {pageIndex === 0 && (
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Summary Statistics</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Papers in Report:</Text>
                <Text style={styles.summaryValue}>{papers.length}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Year Range:</Text>
                <Text style={styles.summaryValue}>{getYearRange()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Most Common Department:</Text>
                <Text style={styles.summaryValue}>
                  {getMostCommonDepartment()}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>IT Papers:</Text>
                <Text style={styles.summaryValue}>
                  {departmentCounts["Information Technology"] || 0}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>CS Papers:</Text>
                <Text style={styles.summaryValue}>
                  {departmentCounts["Computer Science"] || 0}
                </Text>
              </View>
            </View>
          )}

          {/* ─── TABLE ───────────────────────────────────────────────── */}
          <View style={styles.table}>
            {/* Table Header (repeated on every page) */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.colNum]}>#</Text>
              <Text style={[styles.headerCell, styles.colTitle]}>
                RESEARCH TITLE
              </Text>
              <Text style={[styles.headerCell, styles.colAuthors]}>
                AUTHORS
              </Text>
              <Text style={[styles.headerCell, styles.colDepartment]}>
                DEPARTMENT
              </Text>
              <Text style={[styles.headerCell, styles.colYear]}>YEAR</Text>
            </View>

            {/* Rows for this page (each uses wrap=false) */}
            {chunk.map((p, idx) => {
              // 1) Split raw author string on double-spaces:
              const rawAuthors = p.author || "";
              const authorChunks = rawAuthors
                .split("  ")
                .map((a) => a.trim())
                .filter((a) => a !== "");

              // 2) Flip "Last, First" → "First Last":
              const formattedAuthors = authorChunks.map((a) => {
                const parts = a.split(",");
                if (parts.length === 2) {
                  return `${parts[1].trim()} ${parts[0].trim()}`;
                }
                return a;
              });

              // 3) Number each author on its own line, but truncate heavily for A4 portrait
              const maxAuthors = 3; // Reduced for smaller page
              const displayAuthors = formattedAuthors.slice(0, maxAuthors);
              const numberedAuthors = displayAuthors
                .map((name, i) => `${i + 1}. ${truncateText(name, 15)}`) // Shorter names for A4
                .join("\n");

              const additionalAuthors =
                formattedAuthors.length > maxAuthors
                  ? `\n+${formattedAuthors.length - maxAuthors} more`
                  : "";

              const departmentAbbr =
                p.department === "Information Technology"
                  ? "IT"
                  : p.department === "Computer Science"
                    ? "CS"
                    : truncateText(p.department || "", 6);

              return (
                <View
                  style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
                  key={p.paper_id}
                >
                  <Text style={[styles.cell, styles.colNum]}>
                    {pageIndex * ROWS_PER_PAGE + idx + 1}
                  </Text>
                  <Text
                    style={[styles.cell, styles.colTitle, styles.titleText]}
                  >
                    {truncateText(p.title || "", 50)}
                  </Text>
                  <Text
                    style={[styles.cell, styles.colAuthors, styles.authorsText]}
                    wrap={false}
                  >
                    {numberedAuthors + additionalAuthors}
                  </Text>
                  <Text style={[styles.cell, styles.colDepartment]}>
                    {departmentAbbr}
                  </Text>
                  <Text style={[styles.cell, styles.colYear]}>
                    {p.year || "N/A"}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Footer removed - no longer needed */}
        </Page>
      ))}
    </Document>
  );
};

export default PapersReport;
