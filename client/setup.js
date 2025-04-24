// client/setup.js
// This script helps set up the client project properly

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Hotel Management System client setup...');

// Function to execute shell commands
function runCommand(command) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing ${command}:`, error.message);
    return false;
  }
}

// Check if package.json exists
if (!fs.existsSync(path.join(__dirname, 'package.json'))) {
  console.log('package.json not found. Creating new Vite + React project...');
  
  // Create a temporary directory
  if (!fs.existsSync(path.join(__dirname, 'temp'))) {
    fs.mkdirSync(path.join(__dirname, 'temp'));
  }
  
  // Go to temp directory and create new Vite project
  process.chdir(path.join(__dirname, 'temp'));
  if (!runCommand('npm create vite@latest temp-app -- --template react')) {
    console.error('Failed to create Vite project. Please make sure npm and Vite are installed.');
    process.exit(1);
  }
  
  // Copy the generated files to the parent directory
  process.chdir(path.join(__dirname, 'temp', 'temp-app'));
  const filesToCopy = fs.readdirSync('.');
  
  filesToCopy.forEach(file => {
    if (file !== 'node_modules' && file !== '.git') {
      try {
        fs.cpSync(file, path.join(__dirname, file), { recursive: true });
      } catch (error) {
        console.error(`Error copying ${file}:`, error.message);
      }
    }
  });
  
  // Clean up
  process.chdir(__dirname);
  fs.rmSync(path.join(__dirname, 'temp'), { recursive: true, force: true });
  
  console.log('Vite + React project template created successfully.');
} else {
  console.log('Found existing package.json. Continuing with setup...');
}

// Install dependencies
console.log('Installing dependencies...');
if (!runCommand('npm install')) {
  console.error('Failed to install dependencies.');
  process.exit(1);
}

// Install additional required packages
console.log('Installing additional packages...');
if (!runCommand('npm install react-router-dom axios @headlessui/react @heroicons/react recharts react-hook-form react-datepicker react-icons tailwindcss autoprefixer postcss')) {
  console.warn('Warning: Some additional packages could not be installed. You may need to install them manually.');
}

// Create tailwind.config.js if it doesn't exist
const tailwindConfigPath = path.join(__dirname, 'tailwind.config.js');
if (!fs.existsSync(tailwindConfigPath)) {
  console.log('Creating Tailwind CSS configuration...');
  fs.writeFileSync(
    tailwindConfigPath,
    `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
  );
}

// Create postcss.config.js if it doesn't exist
const postcssConfigPath = path.join(__dirname, 'postcss.config.js');
if (!fs.existsSync(postcssConfigPath)) {
  console.log('Creating PostCSS configuration...');
  fs.writeFileSync(
    postcssConfigPath,
    `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
  );
}

// Create or update index.css with Tailwind directives
const indexCssPath = path.join(__dirname, 'src', 'index.css');
if (!fs.existsSync(indexCssPath)) {
  console.log('Creating index.css with Tailwind directives...');
  fs.writeFileSync(
    indexCssPath,
    `@tailwind base;
@tailwind components;
@tailwind utilities;
`
  );
}

// Create basic component directories
const directories = [
  'src/components',
  'src/components/auth',
  'src/components/common',
  'src/components/layout',
  'src/contexts',
  'src/hooks',
  'src/pages',
  'src/services',
  'src/utils'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Create basic App.jsx file
const appPath = path.join(__dirname, 'src', 'App.jsx');
if (!fs.existsSync(appPath)) {
  console.log('Creating basic App.jsx...');
  fs.writeFileSync(
    appPath,
    `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
`
  );
}

// Create basic Dashboard page
const dashboardPath = path.join(__dirname, 'src', 'pages', 'Dashboard.jsx');
if (!fs.existsSync(dashboardPath)) {
  console.log('Creating basic Dashboard page...');
  fs.writeFileSync(
    dashboardPath,
    `import { useState, useEffect } from 'react';

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hotel Management Dashboard</h1>
      <p className="mt-4">Welcome to your hotel management system!</p>
    </div>
  );
}

export default Dashboard;
`
  );
}

console.log('\nSetup completed successfully!');
console.log('\nTo start the development server, run:');
console.log('npm run dev');