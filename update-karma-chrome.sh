#!/bin/bash
# Script to update all karma.conf.js files with Chrome configuration
CHROME_PATH="/var/lib/flatpak/app/com.google.Chrome/x86_64/stable/b4b095943049f6be8d42965e277cf148a206830c6b5ae1cb550182cea992cb21/files/bin/chrome"

find . -name "karma.conf.js" -type f | while read file; do
  if ! grep -q "customLaunchers" "$file"; then
    echo "Updating $file..."
    # This is a simple approach - you may want to manually update each file
    echo "Note: $file may need manual update"
  fi
done
