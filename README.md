# How to Run Tests
This document provides instructions on how to set up and run tests for the OrangeHRM demo web app.The test cover login, user creation, created user details verification, view and verify project time report.

# Tools/Technologies:
Cypress
Programming Language: JS

# System requirements
## Operating System
Cypress is a desktop application that is installed on your computer. The desktop application supports these operating systems:

macOS 10.9 and above (Intel or Apple Silicon 64-bit (x64 or arm64))
Linux Ubuntu 20.04 and above, Fedora 21 and Debian 8 (x86_64 or Arm 64-bit (x64 or arm64)) (see Linux Prerequisites down below)
Windows 10 and above (64-bit only)
Node.js
If you're using npm, pnpm or Yarn to install Cypress, we support:

Node.js 18.x
Node.js 20.x and above

## Getting Started


### Prerequisites

- Install Node.js
- Install VS Code

- Install Cypress
```
npm install cypress --save-dev

```

## Installation
### Clone the repository to your local machine.
### Install project dependencies using npm.

# Run Tests in Cypress Test Runner:
This command will download and run the latest version of Cypress for your project and open the Cypress Test Runner.

- Execute the following command:

```
npx cypress open

```

The Cypress Test Runner will open, showing a list of your test files on the left and providing a graphical interface for running and interacting with your tests.

Run Tests:

- Click on a test file to run all tests in that file.
- Click on a specific test within a file to run only that test.
- You can also run tests in headless mode by clicking on the "Run All Tests" button at the top-right of the Cypress Test Runner.

# Run tests in a headless mode for continuous integration

You can run the automation scripts by typing in the terminal:
```
npm run test
```