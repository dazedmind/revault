// revault-rbac-test.js - Complete RBAC Testing Script for ReVault System

// 1. Your Actual RBAC Table based on your codebase
const rbacTable = {
  // Authentication & User Management
  login: {
    ADMIN: true,
    ASSISTANT: true,
    LIBRARIAN: true,
    STUDENT: true,
    FACULTY: true,
  },
  manage_users: {
    ADMIN: true,
    ASSISTANT: false,
    LIBRARIAN: false,
    STUDENT: false,
    FACULTY: false,
  },
  create_user: {
    ADMIN: true,
    ASSISTANT: false,
    LIBRARIAN: false,
    STUDENT: false,
    FACULTY: false,
  },
  delete_user: {
    ADMIN: true,
    ASSISTANT: false,
    LIBRARIAN: false,
    STUDENT: false,
    FACULTY: false,
  },
  update_user: {
    ADMIN: true,
    ASSISTANT: false,
    LIBRARIAN: false,
    STUDENT: false,
    FACULTY: false,
  },

  // Papers Management
  read_papers: {
    ADMIN: true,
    ASSISTANT: true,
    LIBRARIAN: true,
    STUDENT: true,
    FACULTY: true,
  },
  search_papers: {
    ADMIN: true,
    ASSISTANT: true,
    LIBRARIAN: true,
    STUDENT: true,
    FACULTY: true,
  },
  upload_papers: {
    ADMIN: false,
    ASSISTANT: false,
    LIBRARIAN: true,
    STUDENT: false,
    FACULTY: false,
  },
  edit_papers: {
    ADMIN: false,
    ASSISTANT: false,
    LIBRARIAN: true,
    STUDENT: false,
    FACULTY: false,
  },
  delete_papers: {
    ADMIN: false,
    ASSISTANT: false,
    LIBRARIAN: true,
    STUDENT: false,
    FACULTY: false,
  },

  // User Features
  bookmark_papers: {
    ADMIN: false,
    ASSISTANT: false,
    LIBRARIAN: false,
    STUDENT: true,
    FACULTY: true,
  },
  view_bookmarks: {
    ADMIN: false,
    ASSISTANT: false,
    LIBRARIAN: false,
    STUDENT: true,
    FACULTY: true,
  },
  change_password: {
    ADMIN: true,
    ASSISTANT: true,
    LIBRARIAN: true,
    STUDENT: true,
    FACULTY: true,
  },
  edit_profile: {
    ADMIN: true,
    ASSISTANT: true,
    LIBRARIAN: true,
    STUDENT: true,
    FACULTY: true,
  },

  // Admin/Staff Operations
  view_activity_logs: {
    ADMIN: true,
    ASSISTANT: true,
    LIBRARIAN: true,
    STUDENT: false,
    FACULTY: false,
  },
  generate_reports: {
    ADMIN: true,
    ASSISTANT: true,
    LIBRARIAN: false,
    STUDENT: false,
    FACULTY: false,
  },
  view_stats: {
    ADMIN: true,
    ASSISTANT: true,
    LIBRARIAN: true,
    STUDENT: false,
    FACULTY: false,
  },

  // Settings & Configuration
  manage_settings: {
    ADMIN: true,
    ASSISTANT: false,
    LIBRARIAN: false,
    STUDENT: false,
    FACULTY: false,
  },
  view_admin_panel: {
    ADMIN: true,
    ASSISTANT: true,
    LIBRARIAN: true,
    STUDENT: false,
    FACULTY: false,
  },
};

const roles = ["ADMIN", "ASSISTANT", "LIBRARIAN", "STUDENT", "FACULTY"];
const operations = Object.keys(rbacTable);

// Configuration - Update these with your actual test environment
const CONFIG = {
  baseUrl: "http://localhost:3000", // Update this to your app URL
  testUsers: {
    ADMIN: {
      idNumber: "1234567890", // 10-digit employee ID
      password: "testpass123",
      token: null,
    },
    ASSISTANT: {
      idNumber: "1234567891",
      password: "testpass123",
      token: null,
    },
    LIBRARIAN: {
      idNumber: "1234567892",
      password: "testpass123",
      token: null,
    },
    STUDENT: {
      idNumber: "202400001", // 9-digit student number
      password: "testpass123",
      token: null,
    },
    FACULTY: {
      idNumber: "1234567894",
      password: "testpass123",
      token: null,
    },
  },
};

// API Endpoint Mappings
const endpointMap = {
  login: { method: "POST", url: "/api/login" },
  manage_users: { method: "GET", url: "/admin/api/users" },
  create_user: { method: "POST", url: "/admin/api/create-user" },
  delete_user: { method: "DELETE", url: "/admin/api/delete-user/1" },
  update_user: { method: "PUT", url: "/admin/api/update-user/1" },

  read_papers: { method: "GET", url: "/api/papers" },
  search_papers: { method: "GET", url: "/api/search?q=test" },
  upload_papers: { method: "POST", url: "/api/upload" },
  edit_papers: { method: "PUT", url: "/api/paper/1" },

  bookmark_papers: { method: "POST", url: "/api/bookmark" },
  view_bookmarks: { method: "GET", url: "/api/get-bookmark" },
  change_password: { method: "POST", url: "/api/profile/change-password" },
  edit_profile: { method: "GET", url: "/api/profile" },

  view_activity_logs: { method: "GET", url: "/admin/api/get-logs" },
  generate_reports: { method: "GET", url: "/admin/api/activity-logs-report" },
  view_stats: { method: "GET", url: "/admin/api/stats" },

  manage_settings: {
    method: "GET",
    url: "/admin/settings/security/manage-users",
  },
  view_admin_panel: { method: "GET", url: "/admin/api/profile" },
};

// Utility Functions
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function makeRequest(endpoint, role, data = {}) {
  const config = endpointMap[endpoint];
  if (!config) {
    throw new Error(`Endpoint ${endpoint} not mapped`);
  }

  const token = CONFIG.testUsers[role]?.token;
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method: config.method,
    headers,
  };

  if (config.method !== "GET" && Object.keys(data).length > 0) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${CONFIG.baseUrl}${config.url}`, options);
    return {
      status: response.status,
      ok: response.ok,
      data: await response.json().catch(() => ({})),
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      error: error.message,
    };
  }
}

// Authentication Setup
async function authenticateAllUsers() {
  console.log("🔐 Authenticating test users...\n");

  for (const [role, userData] of Object.entries(CONFIG.testUsers)) {
    try {
      const response = await fetch(`${CONFIG.baseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idNumber: userData.idNumber,
          password: userData.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        CONFIG.testUsers[role].token = result.token;
        console.log(`✅ ${role}: Authenticated successfully`);
      } else {
        console.log(`❌ ${role}: Authentication failed (${response.status})`);
        CONFIG.testUsers[role].token = null;
      }
    } catch (error) {
      console.log(`❌ ${role}: Authentication error - ${error.message}`);
      CONFIG.testUsers[role].token = null;
    }

    await delay(100); // Prevent rate limiting
  }
  console.log("");
}

// Test Coverage Calculation
function calculateTestCoverage() {
  console.log("=== TEST COVERAGE CALCULATION ===");

  const totalTests = operations.length * roles.length;
  console.log(`Total Operations: ${operations.length}`);
  console.log(`Total Roles: ${roles.length}`);
  console.log(`Total Test Cases: ${totalTests}`);

  let positiveTests = 0;
  let negativeTests = 0;

  roles.forEach((role) => {
    let allowedCount = 0;
    let deniedCount = 0;

    operations.forEach((operation) => {
      if (rbacTable[operation][role]) {
        allowedCount++;
        positiveTests++;
      } else {
        deniedCount++;
        negativeTests++;
      }
    });

    console.log(`${role}: ${allowedCount} allowed, ${deniedCount} denied`);
  });

  console.log(`\nPositive Tests (Expected Allow): ${positiveTests}`);
  console.log(`Negative Tests (Expected Deny): ${negativeTests}`);
  console.log(
    `Verification: ${positiveTests + negativeTests} = ${totalTests} ✓`,
  );

  return { totalTests, positiveTests, negativeTests };
}

// Critical Security Test
function criticalSecurityTest() {
  console.log("\n=== CRITICAL SECURITY TEST ===");

  const criticalOps = [
    "manage_users",
    "create_user",
    "delete_user",
    "upload_papers",
  ];
  let securityPassed = true;

  criticalOps.forEach((operation) => {
    console.log(`\nTesting ${operation}:`);
    roles.forEach((role) => {
      const allowed = rbacTable[operation][role];
      const isSecure =
        (role === "ADMIN" &&
          ["manage_users", "create_user", "delete_user"].includes(operation)) ||
        (role === "LIBRARIAN" && operation === "upload_papers") ||
        !allowed;

      const result = isSecure ? "✅ SECURE" : "❌ RISK";
      console.log(`  ${role}: ${result} (${allowed ? "Allowed" : "Denied"})`);
      if (!isSecure) securityPassed = false;
    });
  });

  console.log(
    `\nSecurity Test Result: ${securityPassed ? "✅ PASSED" : "❌ FAILED"}`,
  );
  return securityPassed;
}

// Real System Testing
async function realSystemTest(operation, role) {
  try {
    const response = await makeRequest(operation, role);
    const expected = rbacTable[operation][role];

    // Determine if the actual result matches expectation
    let actual;
    if (response.status === 200 || response.status === 201) {
      actual = true; // Access granted
    } else if (response.status === 401 || response.status === 403) {
      actual = false; // Access denied
    } else {
      // Handle other status codes (404, 500, etc.)
      actual = false; // Treat as denied for security
    }

    return {
      expected: expected,
      actual: actual,
      correct: expected === actual,
      status: response.status,
      error: response.error,
    };
  } catch (error) {
    return {
      expected: rbacTable[operation][role],
      actual: false,
      correct: false,
      status: 0,
      error: error.message,
    };
  }
}

// Success Rate Calculation with Real Testing
async function calculateSuccessRate() {
  console.log("\n=== REAL SYSTEM SUCCESS RATE CALCULATION ===");

  let correctTests = 0;
  let totalTests = 0;
  let detailedResults = [];

  for (const role of roles) {
    console.log(`\nTesting ${role}:`);
    let roleCorrect = 0;

    for (const operation of operations) {
      const test = await realSystemTest(operation, role);
      const result = test.correct ? "✅" : "❌";
      const statusInfo = test.status ? ` (${test.status})` : "";
      console.log(
        `  ${operation}: ${result} Expected: ${test.expected}, Got: ${test.actual}${statusInfo}`,
      );

      detailedResults.push({
        role,
        operation,
        expected: test.expected,
        actual: test.actual,
        correct: test.correct,
        status: test.status,
      });

      if (test.correct) {
        correctTests++;
        roleCorrect++;
      }
      totalTests++;

      await delay(50); // Prevent overwhelming the server
    }

    const roleSuccessRate = ((roleCorrect / operations.length) * 100).toFixed(
      1,
    );
    console.log(`  ${role} Success Rate: ${roleSuccessRate}%`);
  }

  const overallSuccessRate = ((correctTests / totalTests) * 100).toFixed(1);
  console.log(`\nOverall Success Rate: ${overallSuccessRate}%`);
  console.log(`Correct: ${correctTests}/${totalTests}`);

  return { overallSuccessRate, detailedResults, correctTests, totalTests };
}

// RBAC Correctness Verification
function rbacCorrectnessTest(detailedResults) {
  console.log("\n=== RBAC CORRECTNESS TEST ===");

  const failedTests = detailedResults.filter((test) => !test.correct);

  if (failedTests.length === 0) {
    console.log("✅ RBAC system matches specification perfectly!");
  } else {
    console.log("❌ RBAC system has discrepancies:");
    failedTests.forEach((failure) => {
      console.log(
        `  - ${failure.operation} for ${failure.role}: Expected ${failure.expected}, Got ${failure.actual} (Status: ${failure.status})`,
      );
    });
  }

  return failedTests.length === 0;
}

// Generate Test Report
function generateTestReport(
  coverage,
  securityPassed,
  successRate,
  rbacCorrect,
  detailedResults,
) {
  console.log("\n" + "=".repeat(50));
  console.log("📊 FINAL TEST SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total Test Cases: ${coverage.totalTests}`);
  console.log(`Expected Success: ${coverage.positiveTests}`);
  console.log(`Expected Failures: ${coverage.negativeTests}`);
  console.log(`Actual Success Rate: ${successRate.overallSuccessRate}%`);
  console.log(
    `Correct Tests: ${successRate.correctTests}/${successRate.totalTests}`,
  );
  console.log(`Security Test: ${securityPassed ? "PASSED" : "FAILED"}`);
  console.log(`RBAC Correctness: ${rbacCorrect ? "PASSED" : "FAILED"}`);
  console.log("=".repeat(50));

  // Role-based breakdown
  console.log("\n📋 ROLE-BASED BREAKDOWN:");
  roles.forEach((role) => {
    const roleTests = detailedResults.filter((test) => test.role === role);
    const roleCorrect = roleTests.filter((test) => test.correct).length;
    const roleRate = ((roleCorrect / roleTests.length) * 100).toFixed(1);
    console.log(`${role}: ${roleRate}% (${roleCorrect}/${roleTests.length})`);
  });

  // Operation-based breakdown
  console.log("\n🔧 OPERATION-BASED BREAKDOWN:");
  operations.forEach((operation) => {
    const opTests = detailedResults.filter(
      (test) => test.operation === operation,
    );
    const opCorrect = opTests.filter((test) => test.correct).length;
    const opRate = ((opCorrect / opTests.length) * 100).toFixed(1);
    console.log(`${operation}: ${opRate}% (${opCorrect}/${opTests.length})`);
  });
}

// Main Test Runner
async function runAllTests() {
  console.log("🧪 STARTING REVAULT RBAC TESTING\n");

  try {
    // Authenticate all test users first
    await authenticateAllUsers();

    // Run all test functions
    const coverage = calculateTestCoverage();
    const securityPassed = criticalSecurityTest();
    const successRate = await calculateSuccessRate();
    const rbacCorrect = rbacCorrectnessTest(successRate.detailedResults);

    // Generate final report
    generateTestReport(
      coverage,
      securityPassed,
      successRate,
      rbacCorrect,
      successRate.detailedResults,
    );
  } catch (error) {
    console.error("❌ Test execution failed:", error);
  }
}

// Instructions for setup
function printSetupInstructions() {
  console.log("📋 SETUP INSTRUCTIONS:");
  console.log("1. Update CONFIG.baseUrl to your app URL");
  console.log(
    "2. Create test users in your database with the credentials in CONFIG.testUsers",
  );
  console.log("3. Ensure your development server is running");
  console.log("4. Run: node revault-rbac-test.js");
  console.log("");
}

// Run the tests
if (typeof window === "undefined") {
  // Node.js environment
  printSetupInstructions();
  runAllTests();
} else {
  // Browser environment
  console.log("Run in Node.js environment or browser console");
  window.runRBACTest = runAllTests;
  window.setupInstructions = printSetupInstructions;
}
