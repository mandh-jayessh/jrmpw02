# Playwright TypeScript Project with Page Object Model

This is a Playwright framework built with TypeScript and the Page Object Model (POM) design pattern. It allows for easy automation testing with a clear and maintainable structure.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/)

## Project Setup

1. Clone the repository to your local machine.
2. Install the dependencies:

   ```bash
   npm install
3. Install Browsers

    ```bash
    npx playwright install --with-deps
## Project Structure

The project is organized as follows:

- **playwright.config.ts:** Playwright configuration file.
- **tests/:** Directory containing test scripts with .spec.ts extension.
- **pages/:** Directory containing Page Object Model classes for managing page elements and actions.
- **data/:** Directory containing JSON files with test/validation data
## Running Tests
- Run all tests
    - You can execute the tests using npm script - test, defined in the package.json file.
        ```bash
        npm run test
## Test Results
- **playwright-report/:** Directory will be generated having index.html report. html file to be opened in browser.Screenshot will be included in case of test failure


