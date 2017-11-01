const fs = require('fs-extra');
const path = require('path-extra');

// Ensure symlink exists to our custom githooks.
fs.ensureSymlinkSync(path.resolve(process.cwd(), 'scripts/hooks/prepare-commit-msg'), path.resolve(process.cwd(), '.git/hooks/prepare-commit-msg'), true); // eslint-disable-line no-console
