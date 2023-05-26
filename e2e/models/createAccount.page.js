import { expect } from '@playwright/test';


class CreateAccountPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

 // locators
    this.logo = page.locator('img[alt="Findigs Logo"]');
    this.pageTitle = page.locator('h1', {hasText: 'Welcome to Findigs'});
    this.loginBtn = page.getByRole('button', {name: 'Log in'});
    this.getSupportBtn = page.getByRole('button', { name: 'Get support' });
    this.firstNameFld = page.getByPlaceholder('First Name');
    this.lastNameFld = page.getByPlaceholder('Last Name');
    this.emailFld = page.getByPlaceholder('E-mail');
    this.loginEmailFld = page.getByPlaceholder('Email');
    this.phoneFld = page.getByPlaceholder('Phone');
    this.passwordFld = page.getByPlaceholder('Password', { exact: true })
    this.confirmPasswordFld = page.getByPlaceholder("Confirm password");
    this.createAccountBtn = page.getByRole('button', {name: 'Create an account'});
    this.requiredFieldAlert = page.locator('text=This field is required.');
    this.weakPasswordAlert = page.locator('role=tooltip');
    this.passwordFieldAlert = page.locator('span:has-text("Passwords do not match.")')
    this.chatForm = page.getByTestId('message-field');
    this.phoneVerificationPageTitle = page.locator('h2', {hasText: 'Let’s verify your phone number.'});
    this.codeFld = page.getByPlaceholder("4-digit code");
    this.verifyBtn = page.getByRole('button', {name: 'Verify'});
    this.wrongCodeAlert = page.locator('text=Invalid code, please try again.');
    this.changePhoneBtn = page.getByRole('button', {name: 'change phone number'});
    this.resendCodeBtn = page.getByRole('button', {name: 'Re-send code'});
    this.profileBtn = page.getByRole('button', {name: 'Xenia'});
    this.logoutBtn = page.getByRole('button', {name: 'Log out'});
    this.invalidEmailAlert = page.locator('text=Invalid e-mail');
    this.existingEmailAlert = page.locator('text=A user is already registered with this email address.');
    this.signUpBtn = page.getByRole('button', {name: 'Sign up'});
    this.loginBtn = page.getByRole('button', {name: 'Log in'});
    this.forgotPasswordBtn = page.getByRole('button', {name: 'Forgot password?'});
    this.recoverPasswordBtn = page.getByRole('button', {name: 'Recover password'});
    this.recoverPageTitle = page.locator('h2', {hasText: 'We have sent you a recovery email.'});
  }

  async clickOnCreateAccount() {
    await expect(this.createAccountBtn).toBeVisible();
    await this.createAccountBtn.click();
  }

  async clickOnSignup() {
    await expect(this.signUpBtn).toBeVisible();
    await this.signUpBtn.click();
  }

  async login(email, password) {
    await expect(this.loginEmailFld).toBeVisible();
    await expect(this.passwordFld).toBeVisible();
    await this.loginEmailFld.fill(email);
    await this.passwordFld.fill(password);
    await this.loginBtn.click();
  }
  
  async createNewAccount(firstName, lastName, email, phone, password) {
    await this.firstNameFld.fill(firstName);
    await this.lastNameFld.fill(lastName);
    await this.emailFld.fill(email);
    await this.phoneFld.fill(phone);
    await this.passwordFld.fill(password);
    await this.confirmPasswordFld.fill(password);
  }

  async fillCreds(firstName, lastName, email, phone, input1, input2) {
    await this.firstNameFld.fill(firstName);
    await this.lastNameFld.fill(lastName);
    await this.emailFld.fill(email);
    await this.phoneFld.fill(phone);
    await this.confirmPasswordFld.fill(input1);
    await this.passwordFld.fill(input2);
  }

  async clickOnLogin() {
    await expect (this.loginBtn).toBeVisible();
    await this.loginBtn.click();
  }

  async clickOnGetSupport() {
    await expect (this.getSupportBtn).toBeVisible();
    await this.getSupportBtn.click();
  }

  async enterCodeAndVerify(input) {
    await expect(this.phoneVerificationPageTitle).toBeVisible();
    await expect(this.codeFld).toBeEnabled();
    await expect(this.verifyBtn).toBeVisible();
    await this.codeFld.fill(input);
    await this.page.keyboard.press('Tab');
    await this.verifyBtn.click();
  }

  async clickOnResendCode() {
    await expect(this.resendCodeBtn).toBeVisible();
    await this.resendCodeBtn.click();
  }

  async clickOnChangePhone() {
    await expect(this.changePhoneBtn).toBeVisible();
    await this.changePhoneBtn.click();
  }

  async clickToLogout() {
    await expect(this.profileBtn).toBeVisible();
    await this.profileBtn.click();
    await expect(this.logoutBtn).toBeVisible();
    await this.logoutBtn.click();
  }

  async clickOnForgotPassword() {
    await expect(this.forgotPasswordBtn).toBeVisible();
    await this.forgotPasswordBtn.click();
  }

  async navigate() {
    await this.page.goto('https://staging.findigs.com/apply/unitid=f4a480d7-1f0d-4d2a-8533-e2d1bf3dfe33/');
  }

}
  export default CreateAccountPage;
