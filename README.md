# How to Run Tests
This document provides instructions on setting up and running tests for the OrangeHRM demo web app. The tests include login, admin user creation, verification of created admin user details, clearing up created admin user data, viewing and verifying project time reports, candidate creation, verification of created candidate details, and clearing up created candidate data.

# Tools/Technologies:
### Cypress
### Programming Language: JavaScript

# System requirements
## Operating System
Cypress is a desktop application that is installed on your computer. The desktop application supports these operating systems:

macOS 10.9 and above (Intel or Apple Silicon 64-bit (x64 or arm64))
Linux Ubuntu 20.04 and above, Fedora 21 and Debian 8 (x86_64 or Arm 64-bit (x64 or arm64)) 
Windows 10 and above (64-bit only)

Node.js

If you're using npm, pnpm or Yarn to install Cypress, we support:

Node.js 18.x
Node.js 20.x and above

# Getting Started


### Prerequisites And Installation

- Install Node.js
 https://nodejs.org/en/download

- Install Visual Studio Code (VS Code)
 https://code.visualstudio.com/download

- Clone the repository to your local machine.

- Create package.json file
```
npm -i init

```

- Install Cypress
```
npm install cypress --save-dev

```

- To use XPath in Cypress, install XPath plugins
```
npm install -D cypress-xpath

```
Add reference to cypress/support/commands.js: 
```
/// <reference types=”cypress-xpath” />

```
cypress/support/e2e.js: 
```
require(‘cypress-xpath’) 

```
## To generate dynamic data for Test Automation, install Faker library
Faker library is used in Candidate creation tests (First Name, Last Name, Email, Contact Number  etc.)
```
npm install @faker-js/faker --save-dev

```

## Run Tests in Cypress Test Runner:
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

## Run tests in a headless mode for continuous integration
You can run the automation scripts by typing in the terminal:

```
npm run test

```

# Generate a test report using Cypress and Mochawesome
Mochawesome generates a detailed HTML report with information about test suites, test cases, and their results.

## Setup
1.Install cypress-mochawesome-reporter

```
npm i --save-dev cypress-mochawesome-reporter

```
2.Change cypress reporter & setup hooks

Edit config file (cypress.config.js by default)

```
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});

```
3.Add to cypress/support/e2e.js
```
import 'cypress-mochawesome-reporter/register';

```
4.Run all tests and generate report
This command is used in Cypress to execute end-to-end tests in headless mode.
```
npx cypress run

```
5.Run the specified test file and generate report
Replace "path/to/your/test-file.spec.js" with the actual path to your specific test file. This command will execute only the specified test file.
```
npx cypress run --spec "path/to/your/test-file.spec.js"

```
For example :
```
npx cypress run -spec C:\OrangeHRM\cypress\e2e\recruitment.cy.js
```
![Sample test report:](https://github.com/lilyliu2021/OrangeHRM/blob/main/cypress/downloads/images/candidateTestReport.png)
