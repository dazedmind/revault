// revault-rbac-improved-test.js - Enhanced RBAC Testing Script for ReVault System

// Remove manage_settings from operations since it tests frontend route, not API
const rbacTable = {
  // Authentication & User Management
  login: { ADMIN: false, ASSISTANT: false, LIBRARIAN: false, STUDENT: true, FACULTY: true },
  admin_login: { ADMIN: true, ASSISTANT: true, LIBRARIAN: true, STUDENT: false, FACULTY: false },
  manage_users: { ADMIN: true, ASSISTANT: false, LIBRARIAN: false, STUDENT: false, FACULTY: false },
  create_user: { ADMIN: true, ASSISTANT: false, LIBRARIAN: false, STUDENT: false, FACULTY: false },
  update_user: { ADMIN: true, ASSISTANT: false, LIBRARIAN: false, STUDENT: false, FACULTY: false },

  // Papers Management
  read_papers: { ADMIN: true, ASSISTANT: true, LIBRARIAN: true, STUDENT: true, FACULTY: true },
  search_papers: { ADMIN: true, ASSISTANT: true, LIBRARIAN: true, STUDENT: true, FACULTY: true },
  upload_papers: { ADMIN: false, ASSISTANT: false, LIBRARIAN: true, STUDENT: false, FACULTY: false },
  edit_papers: { ADMIN: false, ASSISTANT: false, LIBRARIAN: true, STUDENT: false, FACULTY: false },
  
  // User Features
  bookmark_papers: { ADMIN: false, ASSISTANT: false, LIBRARIAN: false, STUDENT: true, FACULTY: true },
  view_bookmarks: { ADMIN: false, ASSISTANT: false, LIBRARIAN: false, STUDENT: true, FACULTY: true },
  change_password: { ADMIN: true, ASSISTANT: true, LIBRARIAN: true, STUDENT: true, FACULTY: true },
  edit_profile: { ADMIN: true, ASSISTANT: true, LIBRARIAN: true, STUDENT: true, FACULTY: true },
  
  // Admin/Staff Operations
  view_activity_logs: { ADMIN: true, ASSISTANT: true, LIBRARIAN: true, STUDENT: false, FACULTY: false },
  generate_reports: { ADMIN: true, ASSISTANT: true, LIBRARIAN: false, STUDENT: false, FACULTY: false },
  
  // Settings & Configuration
  view_admin_panel: { ADMIN: true, ASSISTANT: true, LIBRARIAN: true, STUDENT: false, FACULTY: false }
};

const roles = ['ADMIN', 'ASSISTANT', 'LIBRARIAN', 'STUDENT', 'FACULTY'];
const operations = Object.keys(rbacTable);

// Enhanced Configuration
const CONFIG = {
  baseUrl: 'http://localhost:3000',
  testUsers: {
    ADMIN: { 
      idNumber: '1314569872',
      password: 'ABCtest123!',
      token: null,
      isAdmin: true
    },
    ASSISTANT: { 
      idNumber: '1232141841', 
      password: 'ABCtest123!',
      token: null,
      isAdmin: true
    },
    LIBRARIAN: { 
      idNumber: '1231490840', 
      password: 'ABCtest123!',
      token: null,
      isAdmin: true
    },
    STUDENT: { 
      idNumber: '202236115',
      password: 'ABCtest123!',
      token: null,
      isAdmin: false
    },
    FACULTY: { 
      idNumber: '2319410230', 
      password: 'ABCtest123!',
      token: null,
      isAdmin: false
    }
  },
  retryAttempts: 1,
  retryDelay: 1000,
  requestTimeout: 10000
};

// Enhanced API Endpoint Mappings with better error handling
const endpointMap = {
  login: { method: 'POST', url: '/api/login', requiresAuth: false },
  admin_login: { 
    method: 'POST', 
    url: '/admin/api/login', 
    requiresAuth: false,
    testData: {
      idNumber: '', // Will be filled by role-specific data
      password: ''  // Will be filled by role-specific data
    }
  },
  manage_users: { method: 'GET', url: '/admin/api/users', requiresAuth: true },
  create_user: { 
    method: 'POST', 
    url: '/admin/api/create-user', 
    requiresAuth: true,
    testData: {
      fullName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      employeeID: '1235325934',
      position: 'Librarian-in-Charge',
      password: 'testpass123',
      role: 'LIBRARIAN',
      contactNum: '09123456789',
    }
  },
  update_user: { 
    method: 'PUT', 
    url: '/admin/api/update-user/1314569872', // Use existing user ID instead of fake one
    requiresAuth: true,
    testData: {
      fullName: 'Updated',
      lastName: 'Name',
      email: 'updated@test.com',
      employeeID: '1314569872', // Use existing ADMIN employee ID
      position: 'Admin',
      contactNum: '09123456789',
      password: 'ABCtest123!',
      role: 'ADMIN',
      status: 'Active'
    }
  },

  read_papers: { method: 'GET', url: '/api/papers', requiresAuth: true },
  search_papers: { method: 'GET', url: '/api/search?q=test', requiresAuth: true },
  upload_papers: { 
    method: 'POST', 
    url: '/api/upload', 
    requiresAuth: true,
    testData: { 
      title: 'Test Paper Upload',
      abstract: 'This is a test abstract for paper upload testing',
      authors: ['Test Author'],
      keywords: ['test', 'paper'],
      department: 'Computer Science',
      year: new Date().getFullYear()
    }
  },
  edit_papers: { 
    method: 'PUT', 
    url: '/api/paper/61', 
    requiresAuth: true,
    testData: { 
      title: 'Updated Test Paper',
      abstract: 'Updated abstract for testing',
      keywords: ['updated', 'test']
    }
  },
  
  bookmark_papers: { 
    method: 'POST', 
    url: '/api/bookmark', 
    requiresAuth: true,
    testData: { paper_id: 61 }
  },
  view_bookmarks: { method: 'GET', url: '/api/get-bookmark', requiresAuth: true },
  change_password: { 
    method: 'POST', 
    url: '/api/profile/change-password', 
    requiresAuth: true,
    testData: { 
      oldPassword: 'ABCtest123!', // Use actual current password
      newPassword: 'newpass123',
      confirmPassword: 'newpass123' // Add missing confirmPassword field
    }
  },
  edit_profile: { method: 'PUT', url: '/api/profile', requiresAuth: true, testData: { fullName: 'Updated Name' } }, // Change from GET to PUT
  
  view_activity_logs: { method: 'GET', url: '/admin/api/get-logs', requiresAuth: true },
  generate_reports: { method: 'GET', url: '/admin/api/activity-logs-report', requiresAuth: true },
  view_admin_panel: { method: 'GET', url: '/admin/api/profile', requiresAuth: true }
  // Removed manage_settings - it was testing frontend route, not API
};

// Enhanced utility functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequestWithRetry(endpoint, role, data = {}, attempt = 1) {
  try {
    const result = await makeRequest(endpoint, role, data);
    
    // If we get a 500 error and it's not the last attempt, retry
    if (result.status === 500 && attempt < CONFIG.retryAttempts) {
      console.log(`  ⚠️ Attempt ${attempt} failed with 500, retrying...`);
      await delay(CONFIG.retryDelay);
      return makeRequestWithRetry(endpoint, role, data, attempt + 1);
    }
    
    return result;
  } catch (error) {
    if (attempt < CONFIG.retryAttempts) {
      console.log(`  ⚠️ Attempt ${attempt} failed with error, retrying...`);
      await delay(CONFIG.retryDelay);
      return makeRequestWithRetry(endpoint, role, data, attempt + 1);
    }
    throw error;
  }
}

async function makeRequest(endpoint, role, data = {}) {
  const config = endpointMap[endpoint];
  if (!config) {
    throw new Error(`Endpoint ${endpoint} not mapped`);
  }

  const token = CONFIG.testUsers[role]?.token;
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if required
  if (config.requiresAuth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method: config.method,
    headers,
  };

  // Add test data or provided data for non-GET requests
  if (config.method !== 'GET') {
    let requestData = Object.keys(data).length > 0 ? data : config.testData;
    
    // For login endpoints, use role-specific credentials
    if ((endpoint === 'login' || endpoint === 'admin_login') && !Object.keys(data).length) {
      const userData = CONFIG.testUsers[role];
      requestData = {
        idNumber: userData.idNumber,
        password: userData.password
      };
    }
    
    // For change_password endpoint, use role-specific current password
    if (endpoint === 'change_password' && !Object.keys(data).length) {
      const userData = CONFIG.testUsers[role];
      requestData = {
        oldPassword: userData.password, // Use the role's actual current password
        newPassword: 'newpass123',
        confirmPassword: 'newpass123'
      };
    }
    
    if (requestData) {
      options.body = JSON.stringify(requestData);
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.requestTimeout);
    
    const response = await fetch(`${CONFIG.baseUrl}${config.url}`, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    let responseData = {};
    try {
      responseData = await response.json();
    } catch (e) {
      // Response might not be JSON
      responseData = { text: await response.text().catch(() => '') };
    }
    
    return {
      status: response.status,
      ok: response.ok,
      data: responseData
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        status: 0,
        ok: false,
        error: 'Request timeout'
      };
    }
    return {
      status: 0,
      ok: false,
      error: error.message
    };
  }
}

// Enhanced authentication with better error handling
async function authenticateAllUsers() {
  console.log('🔐 Authenticating test users...\n');
  
  for (const [role, userData] of Object.entries(CONFIG.testUsers)) {
    let authSuccess = false;
    
    for (let attempt = 1; attempt <= CONFIG.retryAttempts; attempt++) {
      try {
        const loginEndpoint = userData.isAdmin ? '/admin/api/login' : '/api/login';
        
        console.log(`Attempting ${role} login via ${loginEndpoint} (attempt ${attempt})...`);
        
        const response = await fetch(`${CONFIG.baseUrl}${loginEndpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idNumber: userData.idNumber,
            password: userData.password
          })
        });

        if (response.ok) {
          const result = await response.json();
          CONFIG.testUsers[role].token = result.token || result.accessToken;
          console.log(`✅ ${role}: Authenticated successfully via ${loginEndpoint}`);
          authSuccess = true;
          break;
        } else {
          const errorText = await response.text();
          console.log(`❌ ${role}: Authentication failed (${response.status}) - ${errorText}`);
          
          if (attempt < CONFIG.retryAttempts) {
            await delay(CONFIG.retryDelay);
          }
        }
      } catch (error) {
        console.log(`❌ ${role}: Authentication error - ${error.message}`);
        if (attempt < CONFIG.retryAttempts) {
          await delay(CONFIG.retryDelay);
        }
      }
    }
    
    if (!authSuccess) {
      CONFIG.testUsers[role].token = null;
    }
    
    await delay(200);
  }
  console.log('');
}

// Enhanced real system testing with better categorization
async function realSystemTest(operation, role) {
  try {
    // Skip testing if user authentication failed and auth is required
    const config = endpointMap[operation];
    if (!CONFIG.testUsers[role].token && config.requiresAuth) {
      return {
        expected: rbacTable[operation][role],
        actual: false,
        correct: !rbacTable[operation][role],
        status: 401,
        error: 'Authentication failed',
        category: 'auth_failed'
      };
    }
    
    const response = await makeRequestWithRetry(operation, role);
    const expected = rbacTable[operation][role];
    
    // Enhanced result categorization
    let actual;
    let category = 'unknown';
    
    if (response.status === 200 || response.status === 201) {
      actual = true;
      category = 'access_granted';
    } else if (response.status === 401) {
      actual = false;
      category = 'unauthorized';
    } else if (response.status === 403) {
      actual = false;
      category = 'forbidden';
    } else if (response.status === 404) {
      actual = false;
      category = 'not_found';
    } else if (response.status === 400) {
      actual = false;
      category = 'bad_request';
    } else if (response.status === 500) {
      actual = false;
      category = 'server_error';
    } else if (response.status === 0) {
      actual = false;
      category = 'network_error';
    } else {
      actual = false;
      category = 'other_error';
    }
    
    return {
      expected: expected,
      actual: actual,
      correct: expected === actual,
      status: response.status,
      error: response.error,
      category: category
    };
  } catch (error) {
    return {
      expected: rbacTable[operation][role],
      actual: false,
      correct: false,
      status: 0,
      error: error.message,
      category: 'exception'
    };
  }
}

// Enhanced success rate calculation with detailed categorization
async function calculateSuccessRate() {
  console.log('\n=== REAL SYSTEM SUCCESS RATE CALCULATION ===');
  
  let correctTests = 0;
  let totalTests = 0;
  let detailedResults = [];
  let categoryStats = {};
  
  for (const role of roles) {
    console.log(`\nTesting ${role}:`);
    let roleCorrect = 0;
    
    for (const operation of operations) {
      const test = await realSystemTest(operation, role);
      const result = test.correct ? '✅' : '❌';
      const statusInfo = test.status ? ` (${test.status})` : '';
      const categoryInfo = test.category ? ` [${test.category}]` : '';
      const errorInfo = test.error ? ` - ${test.error}` : '';
      
      console.log(`  ${operation}: ${result} Expected: ${test.expected}, Got: ${test.actual}${statusInfo}${categoryInfo}${errorInfo}`);
      
      // Track category statistics
      if (!categoryStats[test.category]) {
        categoryStats[test.category] = 0;
      }
      categoryStats[test.category]++;
      
      detailedResults.push({
        role,
        operation,
        expected: test.expected,
        actual: test.actual,
        correct: test.correct,
        status: test.status,
        error: test.error,
        category: test.category
      });
      
      if (test.correct) {
        correctTests++;
        roleCorrect++;
      }
      totalTests++;
      
      await delay(150); // Slightly longer delay to prevent overwhelming
    }
    
    const roleSuccessRate = ((roleCorrect / operations.length) * 100).toFixed(1);
    console.log(`  ${role} Success Rate: ${roleSuccessRate}%`);
  }
  
  const overallSuccessRate = ((correctTests / totalTests) * 100).toFixed(1);
  console.log(`\nOverall Success Rate: ${overallSuccessRate}%`);
  console.log(`Correct: ${correctTests}/${totalTests}`);
  
  // Display category statistics
  console.log('\n📊 Response Category Breakdown:');
  Object.entries(categoryStats).forEach(([category, count]) => {
    const percentage = ((count / totalTests) * 100).toFixed(1);
    console.log(`  ${category}: ${count} (${percentage}%)`);
  });

  return { overallSuccessRate, detailedResults, correctTests, totalTests, categoryStats };
}

// Enhanced report generation with actionable recommendations
function generateTestReport(coverage, securityPassed, successRate, rbacCorrect, detailedResults) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPREHENSIVE TEST REPORT');
  console.log('='.repeat(60));
  console.log(`Total Test Cases: ${coverage.totalTests}`);
  console.log(`Expected Allow: ${coverage.positiveTests}`);
  console.log(`Expected Deny: ${coverage.negativeTests}`);
  console.log(`Actual Success Rate: ${successRate.overallSuccessRate}%`);
  console.log(`Correct Tests: ${successRate.correctTests}/${successRate.totalTests}`);
  console.log(`Security Test: ${securityPassed ? 'PASSED' : 'FAILED'}`);
  console.log(`RBAC Correctness: ${rbacCorrect ? 'PASSED' : 'FAILED'}`);
  
  // Role-based breakdown
  console.log('\n📋 ROLE-BASED BREAKDOWN:');
  roles.forEach(role => {
    const roleTests = detailedResults.filter(test => test.role === role);
    const roleCorrect = roleTests.filter(test => test.correct).length;
    const roleRate = ((roleCorrect / roleTests.length) * 100).toFixed(1);
    const authStatus = CONFIG.testUsers[role].token ? '🔓' : '🔒';
    console.log(`${role}: ${roleRate}% (${roleCorrect}/${roleTests.length}) ${authStatus}`);
  });
  
  // Operation-based breakdown
  console.log('\n🔧 OPERATION-BASED BREAKDOWN:');
  operations.forEach(operation => {
    const opTests = detailedResults.filter(test => test.operation === operation);
    const opCorrect = opTests.filter(test => test.correct).length;
    const opRate = ((opCorrect / opTests.length) * 100).toFixed(1);
    console.log(`${operation}: ${opRate}% (${opCorrect}/${opTests.length})`);
  });
  
  // Authentication Summary
  console.log('\n🔐 AUTHENTICATION SUMMARY:');
  Object.entries(CONFIG.testUsers).forEach(([role, userData]) => {
    const status = userData.token ? '✅ Authenticated' : '❌ Failed';
    const endpoint = userData.isAdmin ? '/admin/api/login' : '/api/login';
    console.log(`${role}: ${status} (${endpoint})`);
  });
  
  // Identify critical issues
  const criticalIssues = detailedResults.filter(test => 
    !test.correct && (test.expected === true || 
    ['manage_users', 'create_user'].includes(test.operation))
  );
  
  if (criticalIssues.length > 0) {
    console.log('\n⚠️ CRITICAL SECURITY ISSUES:');
    criticalIssues.forEach(issue => {
      console.log(`  - ${issue.operation} for ${issue.role}: Expected ${issue.expected}, Got ${issue.actual} (${issue.category})`);
    });
  }
  
  console.log('='.repeat(60));
}

// Add endpoint health check
async function checkEndpointHealth() {
  console.log('\n🏥 ENDPOINT HEALTH CHECK');
  console.log('='.repeat(40));
  
  const healthResults = {};
  
  for (const [endpoint, config] of Object.entries(endpointMap)) {
    try {
      const response = await fetch(`${CONFIG.baseUrl}${config.url}`, {
        method: 'HEAD', // Use HEAD to avoid side effects
        headers: { 'Content-Type': 'application/json' }
      });
      
      healthResults[endpoint] = {
        reachable: true,
        status: response.status
      };
      
      console.log(`${endpoint}: ${response.status >= 200 && response.status < 500 ? '✅' : '❌'} (${response.status})`);
    } catch (error) {
      healthResults[endpoint] = {
        reachable: false,
        error: error.message
      };
      console.log(`${endpoint}: ❌ (${error.message})`);
    }
    
    await delay(100);
  }
  
  return healthResults;
}

// Keep existing utility functions
function calculateTestCoverage() {
  console.log('=== TEST COVERAGE CALCULATION ===');
  
  const totalTests = operations.length * roles.length;
  console.log(`Total operations: ${operations.length}`);
  console.log(`Total Roles: ${roles.length}`);
  console.log(`Total Test Cases: ${totalTests}`);
  
  let positiveTests = 0;
  let negativeTests = 0;
  
  roles.forEach(role => {
    let allowedCount = 0;
    let deniedCount = 0;
    
    operations.forEach(operation => {
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
  console.log(`Verification: ${positiveTests + negativeTests} = ${totalTests} ✓`);
  
  return { totalTests, positiveTests, negativeTests };
}

function criticalSecurityTest() {
  console.log('\n=== CRITICAL SECURITY TEST ===');
  
  const criticalOps = ['manage_users', 'create_user', 'update_user', 'upload_papers'];
  let securityPassed = true;
  
  criticalOps.forEach(operation => {
    console.log(`\nTesting ${operation}:`);
    roles.forEach(role => {
      const allowed = rbacTable[operation][role];
      const isSecure = (role === 'ADMIN' && ['manage_users', 'create_user', 'update_user'].includes(operation)) ||
                       (role === 'LIBRARIAN' && operation === 'upload_papers') ||
                       (!allowed);
      
      const result = isSecure ? '✅ SECURE' : '❌ RISK';
      console.log(`  ${role}: ${result} (${allowed ? 'Allowed' : 'Denied'})`);
      if (!isSecure) securityPassed = false;
    });
  });
  
  console.log(`\nSecurity Test Result: ${securityPassed ? '✅ PASSED' : '❌ FAILED'}`);
  return securityPassed;
}

function rbacCorrectnessTest(detailedResults) {
  console.log('\n=== RBAC CORRECTNESS TEST ===');
  
  const failedTests = detailedResults.filter(test => !test.correct);
  
  if (failedTests.length === 0) {
    console.log('✅ RBAC system matches specification perfectly!');
  } else {
    console.log('❌ RBAC system has discrepancies:');
    failedTests.forEach(failure => {
      console.log(`  - ${failure.operation} for ${failure.role}: Expected ${failure.expected}, Got ${failure.actual} (Status: ${failure.status})`);
    });
  }
  
  return failedTests.length === 0;
}

// Enhanced main test runner
async function runAllTests() {
  console.log('🧪 STARTING ENHANCED REVAULT RBAC TESTING\n');
  
  try {
    // Check endpoint health first
    const healthResults = await checkEndpointHealth();
    
    // Authenticate all test users
    await authenticateAllUsers();
    
    // Run all test functions
    const coverage = calculateTestCoverage();
    const securityPassed = criticalSecurityTest();
    const successRate = await calculateSuccessRate();
    const rbacCorrect = rbacCorrectnessTest(successRate.detailedResults);
    
    // Generate comprehensive report
    generateTestReport(coverage, securityPassed, successRate, rbacCorrect, successRate.detailedResults);

  } catch (error) {
    console.error('❌ Test execution failed:', error);
  }
}

// Run the tests
if (typeof window === 'undefined') {
  runAllTests();
} else {
  console.log('Run in Node.js environment or browser console');
  window.runRBACTest = runAllTests;
}