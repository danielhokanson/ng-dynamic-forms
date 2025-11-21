#!/bin/bash

# Function to clean up test resources
cleanup_test_resources() {
    echo "========================================="
    echo "Cleaning up test resources..."
    echo "========================================="
    
    # Kill all Chrome/Karma/Node test processes more aggressively
    pkill -9 -f "karma" 2>/dev/null
    pkill -9 -f "chrome.*headless" 2>/dev/null
    pkill -9 -f "chrome.*karma" 2>/dev/null
    pkill -9 -f "ng test" 2>/dev/null
    # Kill any node processes running test commands
    ps aux | grep -E "node.*test|node.*karma" | grep -v grep | awk '{print $2}' | xargs -r kill -9 2>/dev/null
    
    # Free up port 9876 (Karma default port)
    fuser -k 9876/tcp 2>/dev/null
    lsof -ti:9876 2>/dev/null | xargs -r kill -9 2>/dev/null
    
    # Clean up Karma temp directories
    rm -rf /tmp/karma-* 2>/dev/null
    
    # Wait a moment for processes to fully terminate
    sleep 2
    
    # Verify cleanup
    if ps aux | grep -E "karma|chrome.*headless" | grep -v grep | grep -v Steam | grep -v Cursor | grep -v Synergy > /dev/null; then
        echo "Warning: Some test processes may still be running"
    else
        echo "✓ All test processes cleaned up"
    fi
    
    if lsof -i :9876 2>/dev/null > /dev/null; then
        echo "Warning: Port 9876 may still be in use"
    else
        echo "✓ Port 9876 is free"
    fi
    
    echo ""
}

# Function to run a test suite
run_test() {
    local test_name=$1
    local test_command=$2
    
    echo "========================================="
    echo "Running: $test_name"
    echo "Command: $test_command"
    echo "========================================="
    
    # Clean up before each test
    cleanup_test_resources
    
    # Run the test with timeout (3 minutes per test to catch hangs faster)
    # Use timeout with SIGTERM first, then SIGKILL after 5 seconds
    timeout -k 5 180 bash -c "$test_command --watch=false --browsers=ChromeHeadless" 2>&1 | tee "/tmp/test-${test_name}.log"
    local exit_code=${PIPESTATUS[0]}
    
    # Force cleanup immediately after test (in case timeout didn't work)
    pkill -9 -f "karma" 2>/dev/null
    pkill -9 -f "chrome.*headless" 2>/dev/null
    pkill -9 -f "chrome.*karma" 2>/dev/null
    pkill -9 -f "ng test" 2>/dev/null
    sleep 1
    
    # Clean up after each test
    cleanup_test_resources
    
    if [ $exit_code -eq 0 ]; then
        echo "✓ $test_name PASSED"
    elif [ $exit_code -eq 124 ]; then
        echo "✗ $test_name TIMED OUT (exceeded 5 minutes)"
    else
        echo "✗ $test_name FAILED (exit code: $exit_code)"
    fi
    
    echo ""
    return $exit_code
}

# Main execution
cd /home/dhokanson/Dev/ng-dynamic-forms

# Initial cleanup
cleanup_test_resources

# Track results
FAILED_TESTS=()
PASSED_TESTS=()

# Run all test suites
echo "Starting test suite execution..."
echo ""

# Core tests
if run_test "test:core" "npx ng test @danielhokanson/ng-dynamic-forms-core --code-coverage"; then
    PASSED_TESTS+=("test:core")
else
    FAILED_TESTS+=("test:core")
fi

# UI Basic tests
if run_test "test:ui-basic" "npx ng test @danielhokanson/ng-dynamic-forms-ui-basic --code-coverage"; then
    PASSED_TESTS+=("test:ui-basic")
else
    FAILED_TESTS+=("test:ui-basic")
fi

# UI Bootstrap tests
if run_test "test:ui-bootstrap" "npx ng test @danielhokanson/ng-dynamic-forms-ui-bootstrap --code-coverage"; then
    PASSED_TESTS+=("test:ui-bootstrap")
else
    FAILED_TESTS+=("test:ui-bootstrap")
fi

# UI Foundation tests
if run_test "test:ui-foundation" "npx ng test @danielhokanson/ng-dynamic-forms-ui-foundation --code-coverage"; then
    PASSED_TESTS+=("test:ui-foundation")
else
    FAILED_TESTS+=("test:ui-foundation")
fi

# UI Ionic tests
if run_test "test:ui-ionic" "npx ng test @danielhokanson/ng-dynamic-forms-ui-ionic --code-coverage"; then
    PASSED_TESTS+=("test:ui-ionic")
else
    FAILED_TESTS+=("test:ui-ionic")
fi

# UI Material tests
if run_test "test:ui-material" "npx ng test @danielhokanson/ng-dynamic-forms-ui-material --code-coverage"; then
    PASSED_TESTS+=("test:ui-material")
else
    FAILED_TESTS+=("test:ui-material")
fi

# UI NG Bootstrap tests
if run_test "test:ui-ng-bootstrap" "npx ng test @danielhokanson/ng-dynamic-forms-ui-ng-bootstrap --code-coverage"; then
    PASSED_TESTS+=("test:ui-ng-bootstrap")
else
    FAILED_TESTS+=("test:ui-ng-bootstrap")
fi

# UI NGX Bootstrap tests
if run_test "test:ui-ngx-bootstrap" "npx ng test @danielhokanson/ng-dynamic-forms-ui-ngx-bootstrap --code-coverage"; then
    PASSED_TESTS+=("test:ui-ngx-bootstrap")
else
    FAILED_TESTS+=("test:ui-ngx-bootstrap")
fi

# UI PrimeNG tests
if run_test "test:ui-primeng" "npx ng test @danielhokanson/ng-dynamic-forms-ui-primeng --code-coverage"; then
    PASSED_TESTS+=("test:ui-primeng")
else
    FAILED_TESTS+=("test:ui-primeng")
fi

# App tests
# Check if app has any test files
APP_TEST_COUNT=$(find src -name "*.spec.ts" -o -name "*.test.ts" 2>/dev/null | wc -l)
if [ "$APP_TEST_COUNT" -eq 0 ]; then
    echo "========================================="
    echo "Skipping: test:app (no test files found)"
    echo "========================================="
    echo ""
else
    if run_test "test:app" "npx ng test ng-dynamic-forms --code-coverage"; then
        PASSED_TESTS+=("test:app")
    else
        FAILED_TESTS+=("test:app")
    fi
fi

# Final cleanup
cleanup_test_resources

# Summary
echo "========================================="
echo "TEST SUITE SUMMARY"
echo "========================================="
echo "Passed: ${#PASSED_TESTS[@]}"
for test in "${PASSED_TESTS[@]}"; do
    echo "  ✓ $test"
done
echo ""
echo "Failed: ${#FAILED_TESTS[@]}"
for test in "${FAILED_TESTS[@]}"; do
    echo "  ✗ $test"
    echo "    Log: /tmp/test-${test}.log"
done
echo "========================================="

# Exit with error if any tests failed
if [ ${#FAILED_TESTS[@]} -gt 0 ]; then
    exit 1
else
    exit 0
fi
