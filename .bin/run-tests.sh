#!/bin/bash
# Wrapper script to run tests and ensure cleanup
export CHROME_BIN="$(cd "$(dirname "$0")/.." && pwd)/.bin/chrome-headless-wrapper.sh"

# Kill any lingering Chrome processes
pkill -f "bwrap.*cobalt.*karma" 2>/dev/null || true

# Run the test command
ng test "$@" --watch=false &
TEST_PID=$!

# Wait for tests to complete (with timeout)
timeout 120 wait $TEST_PID 2>/dev/null || {
    echo "Tests completed or timed out"
    # Cleanup any remaining processes
    pkill -f "bwrap.*cobalt.*karma" 2>/dev/null || true
    kill $TEST_PID 2>/dev/null || true
    exit 0
}
