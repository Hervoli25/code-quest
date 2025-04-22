#!/bin/bash
# Script to commit and push changes to GitHub

# Add all changes
git add .

# Commit changes
git commit -m "Update database schema with fix_database.sql script"

# Push to GitHub
git push origin main

echo "Changes committed and pushed to GitHub"
