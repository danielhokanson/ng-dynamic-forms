#!/bin/bash
# Wrapper script for Flatpak Chrome to run in headless mode for Karma tests
# Use flatpak run with the app ID and pass all arguments
# Set TMPDIR to use /tmp instead of /run/user/1000 to avoid tmpfs space issues
export TMPDIR="${TMPDIR:-/tmp}"
export XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/tmp/xdg-runtime-$$}"
mkdir -p "$XDG_RUNTIME_DIR" 2>/dev/null || true
exec flatpak run com.google.Chrome "$@"
