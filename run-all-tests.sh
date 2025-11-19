#!/bin/bash
# Clean up zombie processes and run all tests

cleanup() {
    pkill -9 -f "chrome|karma" 2>/dev/null
    sleep 2
    fuser -k 9877/tcp 2>/dev/null
}

run_test() {
    local test_name=$1
    local test_cmd=$2
    echo ""
    echo "=========================================="
    echo "Running: $test_name"
    echo "=========================================="
    cleanup
    timeout 120 $test_cmd 2>&1 | grep -E "(TOTAL:|SUCCESS|FAILED)" | tail -3
    local exit_code=${PIPESTATUS[0]}
    if [ $exit_code -eq 0 ] || [ $exit_code -eq 124 ]; then
        echo "✓ $test_name completed"
    else
        echo "✗ $test_name failed with exit code $exit_code"
    fi
}

cd /home/dhokanson/Dev/ng-dynamic-forms

echo "=== Starting Full Test Suite ==="
echo ""

run_test "Core Tests" "npm run test:core"
run_test "UI Basic Tests" "npm run test:ui-basic"
run_test "UI Bootstrap Tests" "npm run test:ui-bootstrap"
run_test "UI Foundation Tests" "npm run test:ui-foundation"
run_test "UI Material Tests" "npm run test:ui-material"
run_test "UI NG Bootstrap Tests" "npm run test:ui-ng-bootstrap"
run_test "UI NGX Bootstrap Tests" "npm run test:ui-ngx-bootstrap"
run_test "UI PrimeNG Tests" "npm run test:ui-primeng"

cleanup

echo ""
echo "=== All Tests Complete ==="

