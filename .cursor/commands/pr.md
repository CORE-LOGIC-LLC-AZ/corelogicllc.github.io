# Create PR Workflow
Execute the following sequence in order:

1. Stash any uncommitted changes securely.
2. Switch to the main branch `main`, pull the latest remote changes, and check for conflicts.
3. Switch back to the working branch, apply the stashed changes, and guide the user through resolving any conflicts if they arise.
4. Create a new git branch for the new work. Name it concisely based on the changes.
5. Make sure all unit tests pass
6. Stage all uncommitted changes.
7. Generate a meaningful commit message based on the diff and commit.
8. Update CHANGES.md accordingly
9. Push the branch to the remote repository.
10. Use the GitHub CLI (`gh pr create`) or open a PR using the GitHub MCP tool, automatically generating a title and description.
