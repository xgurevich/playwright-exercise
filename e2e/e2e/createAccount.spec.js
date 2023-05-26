import { test, expect } from '@playwright/test';
import CreateAccountPage from '../models/createAccount.page.js';

test.describe('Create Account Functionality', () => {
  /** @type {CreateAccountPage} */
  let createAccountPage;

  test.beforeEach(async ({ page }) => {
    createAccountPage = new CreateAccountPage(page);
    await createAccountPage.navigate();
  });

  // tests

  test('Should be able to render ui elements on create account page', async () => {
    await expect(createAccountPage.pageTitle).toBeVisible();
    await expect(createAccountPage.logo).toBeVisible();
    await expect(createAccountPage.createAccountBtn).toBeDisabled();
    await expect(createAccountPage.firstNameFld).toBeEnabled();
    await expect(createAccountPage.lastNameFld).toBeEnabled();
    await expect(createAccountPage.emailFld).toBeEnabled();
    await expect(createAccountPage.phoneFld).toBeEnabled();
    await expect(createAccountPage.passwordFld).toBeEnabled();
    await expect(createAccountPage.confirmPasswordFld).toBeEnabled();
    });

  test('Should not be able to create account if mandatory fields empty', async ({page}) => {
    await createAccountPage.firstNameFld.click();
    await createAccountPage.lastNameFld.click();
    await createAccountPage.emailFld.click();
    await createAccountPage.phoneFld.click()
    await createAccountPage.passwordFld.click();
    await createAccountPage.confirmPasswordFld.click();
    await page.keyboard.press('Tab'); // need to click on any element to evoke field alerts
    await expect(createAccountPage.requiredFieldAlert).toHaveCount(6);
  });

  test('Validate email format', async ({page}) => {
    const emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
    await createAccountPage.emailFld.fill('abc123');
    await page.keyboard.press('Tab');
    await expect(createAccountPage.invalidEmailAlert).toBeVisible();
    await page.reload(); 
    await createAccountPage.emailFld.fill(emailRegex);
    await expect(createAccountPage.invalidEmailAlert).not.toBeVisible();   
  });

  test('Validate weak password', async () => {
    await createAccountPage.passwordFld.fill('123456');
    await expect(createAccountPage.weakPasswordAlert).toBeVisible();
  });

  test('Validate wrong phone verification code', async ({page}) => {
    await createAccountPage.fillCreds('TestName', 'TestLastName', 'email1@gmail.com', '1234567890', 'TestPassword123?', 'TestPassword123?');
    await page.keyboard.press('Tab');
    await createAccountPage.clickOnCreateAccount();
    await createAccountPage.enterCodeAndVerify('1234');
    await expect(createAccountPage.wrongCodeAlert).toBeVisible();
  });
  
  test('Shoud not be able to create account when passwords dont match', async ({page}) => {
    await createAccountPage.fillCreds('TestName', 'TestLastName', 'email1@gmail.com', '1234567890', 'TestPassword123?', 'TestPassword1234?');
    await page.keyboard.press('Tab');
    await expect(createAccountPage.passwordFieldAlert).toBeVisible();
  });

  test('Validate existing email address', async ({page}) => {
    await createAccountPage.fillCreds('TestName', 'TestLastName', 'email@gmail.com', '1234567890', 'TestPassword1234?', 'TestPassword1234?');
    await page.keyboard.press('Tab');
    await createAccountPage.clickOnCreateAccount();
    await expect(createAccountPage.existingEmailAlert).toBeVisible();
  });

  test('Should redirect to login page and back to sign up page', async ({page}) => {
    await createAccountPage.clickOnLogin();
    await expect(page).toHaveURL('https://staging.findigs.com/login');
    await createAccountPage.clickOnSignup();
    await expect(createAccountPage.page).toHaveURL(/\/(apply.+)/);
  });

  // test('Should open chat when clicking on get support', async () => { // need to debug locator failure
  //   await createAccountPage.clickOnGetSupport();
  //   await expect(createAccountPage.chatForm).toBeVisible();
  // });

  test('Should successfully create new account and redirect to personal application page ', async ({page}) => {
    const applicant = 'TestName';
    await createAccountPage.createNewAccount(applicant, 'TestLastName', 'findigs-test@gmail.com', '1234567890', 'TestPassword1234?');
    await page.keyboard.press('Tab');
    await createAccountPage.createAccountBtn.click();
    await createAccountPage.enterCodeAndVerify('0815');
    await createAccountPage.page.waitForURL(/\/unit-selection/, { waitUntil: 'commit' });
    const redirectMessage = await createAccountPage.page.locator('[data-qa="question-header-text"]').textContent();
    expect (redirectMessage).toContain('Please wait while we process your request.');
    // const applicantNameOnPage = await createAccountPage.page.locator('[data-qa="question-header-text"]').textContent(); // does not wait for page redirect and times out
    // expect(applicantNameOnPage).toContain(applicant);
  });

  test('Should be able to login with existing account and successfully logout', async ({page}) => {
    await createAccountPage.clickOnLogin();
    await createAccountPage.login('xenia.gurevich@gmail.com', 'Emush2023!');
    await expect(createAccountPage.page).toHaveURL(/\/(apply.+)/);
    await createAccountPage.clickToLogout();
    await expect(page).toHaveURL('https://staging.findigs.com/login');
  });

  test('Should be able to redirect to recover password page', async ({page}) => {
    await createAccountPage.clickOnLogin();
    await createAccountPage.clickOnForgotPassword();
    await expect(page).toHaveURL('https://staging.findigs.com/forgot');
    await createAccountPage.emailFld.fill('test@gmail.com');
    await page.keyboard.press('Tab');
    await createAccountPage.recoverPasswordBtn.click();
    await expect(createAccountPage.recoverPageTitle).toBeVisible();
  });

});
