#!/usr/bin/env node
// Wrapper script to run tests with a timeout to prevent hangs
const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const testCommand = args[0] || 'ng';
const testArgs = args.slice(1);
const timeoutMs = 300000; // 5 minutes timeout

console.log(`Running: ${testCommand} ${testArgs.join(' ')}`);
console.log(`Timeout: ${timeoutMs / 1000} seconds`);

const child = spawn(testCommand, testArgs, {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

let timeoutId = setTimeout(() => {
  console.error(`\nTest execution exceeded ${timeoutMs / 1000} seconds. Killing process...`);
  child.kill('SIGTERM');
  
  // Force kill after 5 seconds if it doesn't exit
  setTimeout(() => {
    try {
      child.kill('SIGKILL');
    } catch (e) {
      // Process already dead
    }
    process.exit(1);
  }, 5000);
}, timeoutMs);

child.on('exit', (code) => {
  clearTimeout(timeoutId);
  process.exit(code || 0);
});

child.on('error', (err) => {
  clearTimeout(timeoutId);
  console.error('Error spawning test process:', err);
  process.exit(1);
});

