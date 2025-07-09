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
  created_at?: Date | string; // uploaded date
};

type Props = {
  papers: Paper[];
  filters?: {
    department?: string;
    course?: string;
    sort?: string;
  };
};

/** How many data-rows per page for A4 size (accounting for larger rows with full content). */
const ROWS_PER_PAGE = 12; // Reduced further to accommodate larger rows with full content

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    lineHeight: 1.4,
    minHeight: "100vh", // Ensure full page height
    height: "100%", // Take full available height
  },

  // Header container - pinned at the top of every page
  headerContainer: {
    position: "absolute",
    top: 15,
    left: 20,
    right: 20,
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
    minHeight: 400, // Ensure table takes minimum space even with few rows
    flexGrow: 1, // Allow table to grow and fill available space
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottom: "2px solid #000",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 6,
    paddingHorizontal: 3,
    minHeight: 40,
    // Remove maxHeight to allow rows to expand for full content
    wrap: false, // Prevent row from breaking across pages
    break: false, // Ensure entire row moves to next page if it doesn't fit
    orphans: 0, // Prevent orphaned parts of rows
    widows: 0, // Prevent widow parts of rows
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 6,
    paddingHorizontal: 3,
    backgroundColor: "#f9f9f9",
    minHeight: 40,
    // Remove maxHeight to allow rows to expand for full content
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
    lineHeight: 1.2,
    // Remove overflow property - not supported in react-pdf
    wrap: true, // Allow text wrapping to show full content
  },

  // Updated column widths - smaller authors column, larger title column
  colNum: {
    width: "4%",
    textAlign: "center",
    fontWeight: "bold",
  },
  colTitle: {
    width: "50%", // Increased from 40% to accommodate longer titles
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: "bold",
  },
  colAuthors: {
    width: "20%", // Reduced from 30% to make room for longer titles
    paddingLeft: 3,
    paddingRight: 3,
  },
  colDepartment: {
    width: "8%",
    textAlign: "center",
  },
  colYear: {
    width: "6%",
    textAlign: "center",
    fontWeight: "bold",
  },
  colUploadedDate: {
    width: "12%", // New column for uploaded date
    textAlign: "center",
  },

  // Special text styles
  authorsText: {
    lineHeight: 1.2,
    wrap: true, // Allow wrapping to show full author names
  },
  titleText: {
    fontWeight: "bold",
    lineHeight: 1.2,
    wrap: true, // Allow title text to wrap for better readability
  },
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

  const departmentCounts = getDepartmentCounts();

  // Utility function to truncate text - but we'll allow longer titles now
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  };

  // Utility function to format date
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return "N/A";
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  // Function to format filters for display
  const formatFilters = () => {
    if (!filters) return null;

    const filterInfo: string[] = [];

    if (filters.department && filters.department !== "") {
      const depts = filters.department.split(",").map((d) => d.trim());
      filterInfo.push(`Department(s): ${depts.join(", ")}`);
    }

    if (filters.course && filters.course !== "") {
      const courses = filters.course.split(",").map((c) => c.trim());
      filterInfo.push(`Course(s): ${courses.join(", ")}`);
    }

    if (filters.sort && filters.sort !== "") {
      const sortMap: Record<string, string> = {
        "title-asc": "Title (A-Z)",
        "title-desc": "Title (Z-A)",
        "year-asc": "Year (Oldest first)",
        "year-desc": "Year (Newest first)",
      };
      filterInfo.push(`Sort: ${sortMap[filters.sort] || filters.sort}`);
    }

    filterInfo.push(
      `Status: ${filterInfo.length > 1 ? "Filtered results" : "All papers shown"}`,
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
    
          </View>

          {/* Main content container to ensure full page usage */}
          <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Report Title */}
            <View>
              <Text style={styles.reportTitle}>Report as of {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString()}</Text>
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
                  <Text style={styles.summaryLabel}>
                    Total Papers in Report:
                  </Text>
                  <Text style={styles.summaryValue}>{papers.length}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Year Range:</Text>
                  <Text style={styles.summaryValue}>{getYearRange()}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>
                    Most Common Department:
                  </Text>
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
                  DEPT
                </Text>
                <Text style={[styles.headerCell, styles.colYear]}>YEAR</Text>
                <Text style={[styles.headerCell, styles.colUploadedDate]}>
                  UPLOADED
                </Text>
              </View>

              {/* Rows for this page */}
              {chunk.map((p, idx) => {
                // 1) Parse author string based on your format examples:
                // "Besabe, F. M., Francisco, M. A. C. P., Guanzon, J. C. A., Sarmiento, J. P. R."
                const rawAuthors = p.author || "";

                // Split by comma and space, then reconstruct full author names
                const parts = rawAuthors
                  .split(", ")
                  .filter((part) => part.trim() !== "");

                const formattedAuthors: string[] = [];
                let currentAuthor = "";

                for (let i = 0; i < parts.length; i++) {
                  const part = parts[i].trim();

                  if (currentAuthor === "") {
                    // This is a last name (start of new author)
                    currentAuthor = part;
                  } else {
                    // This is initials, add to current author
                    currentAuthor += ", " + part;

                    // If this part ends with a period, the author is complete
                    if (part.endsWith(".")) {
                      formattedAuthors.push(currentAuthor);
                      currentAuthor = "";
                    }
                  }
                }

                // If there's a remaining author (in case the last one doesn't end with period)
                if (currentAuthor !== "") {
                  if (!currentAuthor.endsWith(".")) {
                    currentAuthor += ".";
                  }
                  formattedAuthors.push(currentAuthor);
                }

                // 2) Sort authors alphabetically by last name and number them
                const sortedAuthors = [...formattedAuthors].sort();

                // Show all authors with full names, numbered, each on a new line
                const numberedAuthors = sortedAuthors
                  .map((name, i) => `${i + 1}. ${name}`)
                  .join("\n"); // Each author on a new line

                const departmentAbbr =
                  p.department === "Information Technology"
                    ? "IT"
                    : p.department === "Computer Science"
                      ? "CS"
                      : p.department || "N/A"; // Show full department name or N/A

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
                      {p.title || "Untitled"}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        styles.colAuthors,
                        styles.authorsText,
                      ]}
                      wrap={true}
                    >
                      {numberedAuthors}
                    </Text>
                    <Text style={[styles.cell, styles.colDepartment]}>
                      {departmentAbbr}
                    </Text>
                    <Text style={[styles.cell, styles.colYear]}>
                      {p.year || "N/A"}
                    </Text>
                    <Text style={[styles.cell, styles.colUploadedDate]}>
                      {formatDate(p.created_at)}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Spacer to push content and ensure full page height */}
            <View style={{ flexGrow: 1 }} />
          </View>

          {/* Footer removed - no longer needed */}
        </Page>
      ))}
    </Document>
  );
};

export default PapersReport;
