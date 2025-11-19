#!/bin/bash
# Wrapper script for Flatpak Chrome to run in headless mode for Karma tests
# Use flatpak run with the app ID and pass all arguments
exec flatpak run com.google.Chrome "$@"
