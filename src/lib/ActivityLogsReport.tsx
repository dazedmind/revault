// File: src/lib/ActivityLogsReport.tsx
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

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 80,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    lineHeight: 1.4,
  },
  headerContainer: {
    position: "absolute",
    top: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    borderBottom: "2px solid #000",
    paddingBottom: 10,
    marginBottom: 20,
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
  reportTitle: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
  },

  filterInfo: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    marginBottom: 15,
    border: "1px solid #ddd",
  },
  filterTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },
  filterText: {
    fontSize: 9,
    color: "#666",
    marginBottom: 2,
  },
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
    paddingVertical: 6,
    paddingHorizontal: 4,
    minHeight: 28,
    breakInside: "avoid",
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 6,
    paddingHorizontal: 4,
    backgroundColor: "#f9f9f9",
    minHeight: 28,
    breakInside: "avoid",
  },
  headerCell: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 2,
  },
  cell: {
    fontSize: 8,
    textAlign: "left",
    paddingHorizontal: 2,
    paddingVertical: 3,
    lineHeight: 1.2,
    flexWrap: "wrap",
  },
  dateTimeCol: { width: "16%" },
  userCol: { width: "14%" },
  actionCol: { width: "35%" },
  typeCol: { width: "15%" },
  statusCol: { width: "10%" },
  ipCol: { width: "10%" },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTop: "1px solid #ddd",
    paddingTop: 5,
  },
  footerText: {
    fontSize: 8,
    color: "#666",
  },
  pageNumber: {
    fontSize: 8,
    color: "#666",
    textAlign: "right",
    marginTop: 5,
  },
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
});

interface ActivityLog {
  name: string;
  activity: string;
  created_at: string;
  ip_address: string;
  activity_type: string;
  status: string;
}

interface ActivityLogsReportProps {
  logs: ActivityLog[];
  filters?: {
    userId?: string;
    activityTypes?: string;
    userCount?: number;
    dateRange?: string;
  };
  total: number;
  page: number;
  limit: number;
}

const ActivityLogsReport: React.FC<ActivityLogsReportProps> = ({
  logs,
  filters,
  total,
  page,
  limit,
}) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr}\n${timeStr}`;
  };

  const formatActivityType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getActivityTypeCounts = () => {
    const counts: Record<string, number> = {};
    logs.forEach((log) => {
      const type = formatActivityType(log.activity_type);
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  };

  const getStatusCounts = () => {
    const counts: Record<string, number> = {};
    logs.forEach((log) => {
      counts[log.status] = (counts[log.status] || 0) + 1;
    });
    return counts;
  };

  const activityTypeCounts = getActivityTypeCounts();
  const statusCounts = getStatusCounts();

  return (
    <Document>
      <Page size="LETTER" style={styles.page} orientation="landscape">
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

        {/* Report Title */}
        <View>
          <Text style={styles.reportTitle}>Activity Logs Report</Text>
        </View>

        {/* Filter Information */}
        {filters && (
          <View style={styles.filterInfo}>
            <Text style={styles.filterTitle}>Applied Filters:</Text>
            <Text style={styles.filterText}>
              User Filter:{" "}
              {filters.userId === "all"
                ? "All Users"
                : `User ID: ${filters.userId}`}
            </Text>
            <Text style={styles.filterText}>
              Activity Types:{" "}
              {filters.activityTypes === "all"
                ? "All Types"
                : filters.activityTypes}
            </Text>
            <Text style={styles.filterText}>
              Total Records: {total} | Showing Page: {page} of{" "}
              {Math.ceil(total / limit)}
            </Text>
          </View>
        )}

        {/* Summary Statistics */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary Statistics</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Logs in Report:</Text>
            <Text style={styles.summaryValue}>{logs.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Success Rate:</Text>
            <Text style={styles.summaryValue}>
              {logs.length > 0
                ? `${Math.round(((statusCounts.success || 0) / logs.length) * 100)}%`
                : "N/A"}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Most Common Activity:</Text>
            <Text style={styles.summaryValue}>
              {Object.keys(activityTypeCounts).length > 0
                ? Object.entries(activityTypeCounts).reduce((a, b) =>
                    activityTypeCounts[a[0]] > activityTypeCounts[b[0]] ? a : b,
                  )[0]
                : "N/A"}
            </Text>
          </View>
        </View>

        {/* Activity Logs Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.dateTimeCol]}>
              Date & Time
            </Text>
            <Text style={[styles.headerCell, styles.userCol]}>User</Text>
            <Text style={[styles.headerCell, styles.actionCol]}>Action</Text>
            <Text style={[styles.headerCell, styles.typeCol]}>
              Activity Type
            </Text>
            <Text style={[styles.headerCell, styles.statusCol]}>Status</Text>
            <Text style={[styles.headerCell, styles.ipCol]}>IP Address</Text>
          </View>

          {/* Table Rows */}
          {logs.map((log, index) => (
            <View
              key={index}
              style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
            >
              <Text style={[styles.cell, styles.dateTimeCol]}>
                {formatDateTime(log.created_at)}
              </Text>
              <Text style={[styles.cell, styles.userCol]}>
                {truncateText(log.name, 12)}
              </Text>
              <Text style={[styles.cell, styles.actionCol]}>
                {truncateText(log.activity, 45)}
              </Text>
              <Text style={[styles.cell, styles.typeCol]}>
                {formatActivityType(log.activity_type)}
              </Text>
              <Text style={[styles.cell, styles.statusCol]}>
                {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
              </Text>
              <Text style={[styles.cell, styles.ipCol]}>
                {log.ip_address || "Unknown"}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footerContainer} fixed>
          <Text style={styles.footerText}>
            PLM ReVault - Activity Logs Report | Generated on{" "}
            {new Date().toLocaleString()}
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default ActivityLogsReport;
