#!/bin/bash

# start-session.sh
# Save this file as: ./start-session.sh

echo "🚀 Starting new coding session..."
echo "================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please run 'git init' first."
    exit 1
fi

# Check git status and warn about uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes:"
    git status --short
    echo ""
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted. Please commit or stash your changes first."
        exit 1
    fi
fi

# Fetch latest changes from remote
echo "📡 Fetching latest changes..."
if git remote -v | grep -q origin; then
    git fetch origin
    
    # Check if main branch exists, otherwise use master
    if git show-ref --verify --quiet refs/heads/main; then
        MAIN_BRANCH="main"
    elif git show-ref --verify --quiet refs/heads/master; then
        MAIN_BRANCH="master"
    else
        echo "❌ Error: Neither 'main' nor 'master' branch found."
        exit 1
    fi
    
    echo "🔄 Switching to $MAIN_BRANCH and pulling latest changes..."
    git checkout $MAIN_BRANCH
    git pull origin $MAIN_BRANCH
else
    echo "⚠️  No remote 'origin' found. Skipping pull."
    MAIN_BRANCH="main"
fi

echo ""
echo "💡 What feature are you working on?"
echo "Examples: login-page, user-dashboard, payment-integration, bug-fix-auth"
echo ""
read -p "Feature name: " feature_name

# Validate feature name
if [ -z "$feature_name" ]; then
    echo "❌ Error: Feature name cannot be empty."
    exit 1
fi

# Convert to lowercase and replace spaces with hyphens
feature_name=$(echo "$feature_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')

# Add timestamp to make branch name unique
timestamp=$(date +"%Y%m%d")
branch_name="feature/${feature_name}-${timestamp}"

# Check if branch already exists
if git show-ref --verify --quiet refs/heads/$branch_name; then
    echo "⚠️  Branch '$branch_name' already exists."
    read -p "Do you want to switch to it? (y) or create a new one with different name? (n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout $branch_name
        echo "✅ Switched to existing branch: $branch_name"
    else
        # Add time to make it more unique
        time_suffix=$(date +"%H%M")
        branch_name="feature/${feature_name}-${timestamp}-${time_suffix}"
        git checkout -b $branch_name
        echo "✅ Created new branch: $branch_name"
    fi
else
    # Create new branch
    git checkout -b $branch_name
    echo "✅ Created new branch: $branch_name"
fi

echo ""
echo "📝 Session started successfully!"
echo "================================="
echo "Current branch: $(git branch --show-current)"
echo "Working directory: $(pwd)"
echo ""
echo "💡 Remember to:"
echo "   • Make small, focused commits"
echo "   • Write descriptive commit messages"
echo "   • Test your changes before committing"
echo "   • Run './finish-session.sh' when you're done"
echo ""
echo "Happy coding! 🎉"