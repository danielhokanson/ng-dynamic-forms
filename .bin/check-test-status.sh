#!/bin/bash
# Quick script to check if tests are actually running or stalled

echo "=== Test Process Status ==="
if pgrep -f "ng test" > /dev/null; then
    PID=$(pgrep -f "ng test" | head -1)
    CPU=$(ps -p $PID -o %cpu= | tr -d ' ')
    MEM=$(ps -p $PID -o %mem= | tr -d ' ')
    echo "✅ Test process running (PID: $PID, CPU: ${CPU}%, MEM: ${MEM}%)"
else
    echo "❌ No test process found"
    exit 1
fi

echo ""
echo "=== Chrome Processes ==="
CHROME_COUNT=$(ps aux | grep -E "chrome.*karma|chrome.*9876" | grep -v grep | wc -l)
echo "Active Chrome processes: $CHROME_COUNT"
if [ "$CHROME_COUNT" -gt 0 ]; then
    echo "✅ Browser is active"
else
    echo "⚠️  No Chrome processes found (may be starting)"
fi

echo ""
echo "=== Karma Server ==="
if netstat -tuln 2>/dev/null | grep -q ":9876" || ss -tuln 2>/dev/null | grep -q ":9876"; then
    echo "✅ Karma server listening on port 9876"
else
    echo "⚠️  Karma server not yet listening (may be starting)"
fi

echo ""
echo "=== Recent Activity ==="
if [ -f "/tmp/ng-"*"/angular-errors.log" ] 2>/dev/null; then
    ERROR_LOG=$(ls -t /tmp/ng-*/angular-errors.log 2>/dev/null | head -1)
    if [ -n "$ERROR_LOG" ]; then
        echo "Last error log entry:"
        tail -3 "$ERROR_LOG" 2>/dev/null | head -1
    fi
fi

echo ""
echo "=== System Resources ==="
echo "CPU usage:"
top -b -n 1 -p $PID 2>/dev/null | tail -1 || echo "Unable to get CPU info"

echo ""
echo "💡 Tip: If CPU > 0%, test is working (may just be slow)"
echo "💡 Tip: 'Generating browser application bundles (phase: end)' can take 30-60+ seconds"
