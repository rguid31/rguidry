#!/bin/bash

# finish-session.sh
# Save this file as: ./finish-session.sh

echo "🏁 Finishing coding session..."
echo "==============================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository."
    exit 1
fi

# Get current branch name
current_branch=$(git branch --show-current)
echo "Current branch: $current_branch"

# Check if we're on a feature branch
if [[ $current_branch != feature/* ]]; then
    echo "⚠️  Warning: You're not on a feature branch. Current branch: $current_branch"
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

# Check git status
echo ""
echo "📊 Checking current status..."
git status

# Check if there are any changes to commit
if [ -n "$(git status --porcelain)" ]; then
    echo ""
    echo "📝 You have uncommitted changes."
    echo ""
    echo "What would you like to do?"
    echo "1) Add all changes and commit"
    echo "2) Add specific files and commit"
    echo "3) Stash changes for later"
    echo "4) Review changes first"
    echo "5) Skip committing (not recommended)"
    echo ""
    read -p "Choose an option (1-5): " -n 1 -r
    echo ""
    
    case $REPLY in
        1)
            echo "📦 Adding all changes..."
            git add .
            echo ""
            read -p "💬 Enter commit message: " commit_message
            if [ -n "$commit_message" ]; then
                git commit -m "$commit_message"
                echo "✅ Changes committed successfully!"
            else
                echo "❌ Empty commit message. Aborting commit."
                exit 1
            fi
            ;;
        2)
            echo "📁 Available files to stage:"
            git status --short
            echo ""
            read -p "Enter file paths (space-separated): " files_to_add
            git add $files_to_add
            echo ""
            read -p "💬 Enter commit message: " commit_message
            if [ -n "$commit_message" ]; then
                git commit -m "$commit_message"
                echo "✅ Changes committed successfully!"
            else
                echo "❌ Empty commit message. Aborting commit."
                exit 1
            fi
            ;;
        3)
            echo "📚 Stashing changes..."
            read -p "Enter stash message (optional): " stash_message
            if [ -n "$stash_message" ]; then
                git stash push -m "$stash_message"
            else
                git stash
            fi
            echo "✅ Changes stashed successfully!"
            ;;
        4)
            echo "🔍 Showing git diff..."
            git diff
            echo ""
            echo "Run this script again when you're ready to commit."
            exit 0
            ;;
        5)
            echo "⚠️  Skipping commit. Your changes are still uncommitted."
            ;;
        *)
            echo "❌ Invalid option. Aborting."
            exit 1
            ;;
    esac
else
    echo "✅ No uncommitted changes found."
fi

echo ""
echo "🌐 What would you like to do with your branch?"
echo "1) Push to remote and create/update Pull Request"
echo "2) Push to remote only"
echo "3) Merge into main/master locally"
echo "4) Switch back to main/master (keep feature branch)"
echo "5) Delete feature branch (if work is complete)"
echo "6) Do nothing (stay on current branch)"
echo ""
read -p "Choose an option (1-6): " -n 1 -r
echo ""

case $REPLY in
    1)
        echo "📤 Pushing to remote..."
        if git push -u origin $current_branch; then
            echo "✅ Branch pushed successfully!"
            echo ""
            echo "🔗 Create a Pull Request:"
            # Try to detect GitHub/GitLab and provide appropriate URL
            remote_url=$(git config --get remote.origin.url)
            if [[ $remote_url == *"github.com"* ]]; then
                # Extract repo info for GitHub URL
                repo_path=$(echo $remote_url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')
                echo "   GitHub: https://github.com/$repo_path/compare/$current_branch"
            elif [[ $remote_url == *"gitlab.com"* ]]; then
                repo_path=$(echo $remote_url | sed 's/.*gitlab.com[:/]\(.*\)\.git/\1/')
                echo "   GitLab: https://gitlab.com/$repo_path/-/merge_requests/new?merge_request[source_branch]=$current_branch"
            else
                echo "   Visit your repository's web interface to create a Pull Request"
            fi
        else
            echo "❌ Failed to push branch."
        fi
        ;;
    2)
        echo "📤 Pushing to remote..."
        git push -u origin $current_branch
        echo "✅ Branch pushed successfully!"
        ;;
    3)
        # Store the current feature branch name before switching
        feature_branch=$current_branch
        
        # Determine main branch
        if git show-ref --verify --quiet refs/heads/main; then
            main_branch="main"
        elif git show-ref --verify --quiet refs/heads/master; then
            main_branch="master"
        else
            echo "❌ Error: Neither 'main' nor 'master' branch found."
            exit 1
        fi
        
        echo "🔄 Switching to $main_branch and merging..."
        git checkout $main_branch
        git pull origin $main_branch 2>/dev/null || echo "⚠️  Could not pull from remote"
        
        if git merge $feature_branch; then
            echo "✅ Branch merged successfully into $main_branch!"
            echo ""
            echo "📤 Push merged changes to remote?"
            read -p "Push $main_branch to remote? (Y/n): " -n 1 -r
            echo ""
            if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                git push origin $main_branch
                echo "✅ Changes pushed to remote!"
            fi
            echo ""
            read -p "Delete the feature branch '$feature_branch'? (y/N): " -n 1 -r
            echo ""
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                git branch -d $feature_branch
                echo "✅ Feature branch '$feature_branch' deleted."
            fi
        else
            echo "❌ Merge failed. Please resolve conflicts manually."
        fi
        ;;
    4)
        if git show-ref --verify --quiet refs/heads/main; then
            git checkout main
            echo "✅ Switched to main branch."
        elif git show-ref --verify --quiet refs/heads/master; then
            git checkout master
            echo "✅ Switched to master branch."
        else
            echo "❌ Error: Neither 'main' nor 'master' branch found."
        fi
        ;;
    5)
        # Store the current feature branch name
        feature_branch=$current_branch
        
        echo "🗑️  Deleting feature branch..."
        if git show-ref --verify --quiet refs/heads/main; then
            git checkout main
        elif git show-ref --verify --quiet refs/heads/master; then
            git checkout master
        fi
        
        read -p "Are you sure you want to delete '$feature_branch'? This cannot be undone! (y/N): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git branch -D $feature_branch
            echo "✅ Feature branch '$feature_branch' deleted."
        else
            echo "❌ Branch deletion cancelled."
        fi
        ;;
    6)
        echo "✅ Staying on current branch: $current_branch"
        ;;
    *)
        echo "❌ Invalid option."
        exit 1
        ;;
esac

echo ""
echo "📈 Session Summary:"
echo "==================="
echo "Final branch: $(git branch --show-current)"
echo "Repository status:"
git status --short --untracked-files=no
echo ""
echo "🎉 Session finished successfully!"
echo ""
echo "💡 Next time, run './start-session.sh' to begin a new feature."