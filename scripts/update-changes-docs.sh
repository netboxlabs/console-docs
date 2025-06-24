#!/bin/bash
# Update NetBox Changes documentation from source repository
# Usage: ./scripts/update-changes-docs.sh

set -e

REPO_URL="https://github.com/netboxlabs/netbox-changes.git"
TARGET_DIR="docs/netbox-extensions/changes"
TEMP_DIR="/tmp/netbox-changes-update"

echo "🔄 Updating NetBox Changes documentation..."

# Clean up any existing temp directory
rm -rf "$TEMP_DIR"

# Clone the source repository
echo "📥 Cloning source repository..."
git clone "$REPO_URL" "$TEMP_DIR"

# Remove existing documentation
echo "🗑️  Removing existing documentation..."
rm -rf "$TARGET_DIR"/*

# Copy only the docs content
echo "📋 Copying documentation content..."
mkdir -p "$TARGET_DIR"
cp -r "$TEMP_DIR/docs/"* "$TARGET_DIR/"

# Clean up temp directory
echo "🧹 Cleaning up..."
rm -rf "$TEMP_DIR"

echo "✅ NetBox Changes documentation updated successfully!"
echo ""
echo "Next steps:"
echo "1. Review the changes: git diff"
echo "2. Test the build: python -m mkdocs build"
echo "3. Commit the updates: git add $TARGET_DIR && git commit -m 'Update NetBox Changes documentation'"
echo "4. Push the changes: git push" 