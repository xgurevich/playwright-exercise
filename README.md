# FindigsQAExercise

## Recommended IDE Setup and package manager

- [VS Code](https://code.visualstudio.com/) +
  - Install recommended packages and VSCode extensions: such as PW test, PW test runner etc.
- [Node](https://nodejs.org/en/download/package-manager/#macos)

```sh
brew install node
```  

## Install Playwright and dependencies

This test is designed in Playwright framework, you can read more on Playwright at [Playwright](https://playwright.dev/docs/intro).
Install Playwright using npm package manager.

```sh
npm init playwright@latest
```

During the install process, choose Javascript as a preferred language.

Playwright will create the required files and will download the default browsers for the test runner.
Comment out or delete the following files that have been downloaded as they are duplicates and won't need them for this test, keep the ones that come with the exercise repo.

- tests directory
- test-examples
- package-lock.json
- package.json
- playwright.congif.js

### End-to-End

By default our test will run on 1 browser: chrome using 3 workers. Tests are run in headless mode, meaning no browser will open up when running the tests.
Results of the tests and test logs will be shown in the terminal. By default, if some of the tests fail, a HTML test report will open automatically.
Alternatively, you can install a 3rd party Allure framework to show test results in a visual html report.

Run tests: open terminal from the project directory then run the following commands:

```sh
npx playwright test
```

Open playwright HTML report:

```sh
npx playwright show-report
```

### Test coverage and scope

This End-to-End test is written using POM object-oriented design pattern. Page object model design allows to write reusable and redable automation code and it is much easier to maintain over time. In POM design all web elements are stored in object repository and a test logic is kept separately from web elements.
You will find 2 files in the e2e directriy: models which contains the 1 pom file and the main test file.
The following cases are being asserted in the test:

1. Rendering main web elements
2. Create new account functionality: positive and negative scenarios
3. Fields validation (empty, required and format)
4. Login and logout with existing user functionality
5. Dynamic links functionality

### Allure reporting (Optional)

You can use a 3rd party reporter Allure for our Playwright tests. Upon test run a visual report will be
served as a web page. To conigure allure in your local environment (first time installation): open
terminal and run the following commands:

```sh
npm i -D @playwright/test allure-playwright
```

After running the e2e tests, open new terminal window from /app directory and run the following
command: Generate allure report:

```sh
allure generate allure-results -o allure-report --clean
```

Open allure report:

```sh
allure open allure-report
```
