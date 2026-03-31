const selectors = {
  signupUsernameField: '[data-test="signup-username"]',
  signupPasswordField: '[data-test="signup-password"]',
  signupFirstnameField: '[data-test="signup-first-name"]',
  signupLastnameField: "[data-test='signup-last-name']",
  signupConfirmPassword: "[data-test='signup-confirmPassword']",
  loginButtonSignin: '[data-test="signin-submit"]',
  loginButtonSignup: "[data-test='signup-submit']",
  usernameField: '[data-test="signin-username"]',
  passwordField: '[data-test="signin-password"]',
  sidenavUser: '[data-test="sidenav-username"]',
  navPersonalTab: '[data-test="nav-personal-tab"]',
  transactionList: '[data-test="transaction-list"]',
  transactionItem: '[data-test="transaction-item"]',
  emptymessage: '[data-test="empty-list-header"]',
  onboardingNext: '[data-test="user-onboarding-next"]',
  bankName: '[data-test="bankaccount-bankName-input"]',
  routingNumber: '[data-test="bankaccount-routingNumber-input"]',
  accountNumber: '[data-test="bankaccount-accountNumber-input"]',
  saveButtonBank: '[data-test="bankaccount-submit"]',
};

describe("Functionality: Transaction History", () => {
  let dados;

  let uniqueUsername;

  beforeEach(() => {
    cy.fixture("user-data").then((f) => {
      dados = f;

      uniqueUsername = `${dados.userNoTransaction.username}_${Date.now()}`;
    });
    cy.visit("http://localhost:3000/signin");
  });

  it("Should display transaction history for the user successfully", () => {
    cy.get(selectors.usernameField).type(dados.userTransaction.sender);
    cy.get(selectors.passwordField).type(dados.userTransaction.password);
    cy.get(selectors.loginButtonSignin).click();
    cy.get(selectors.sidenavUser).should("be.visible");
    cy.get(selectors.navPersonalTab).should("contain", "Mine").click();
    cy.url().should("include", "/personal");
    cy.get(selectors.transactionList).should("be.visible");
    cy.contains(dados.userTransaction.expectedUser, { timeout: 10000 }).should("be.visible");
  });

  it("Should display empty state for a new user with no transactions", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get(selectors.signupFirstnameField).type(dados.userNoTransaction.firstname);
    cy.get(selectors.signupLastnameField).type(dados.userNoTransaction.lastname);
    cy.get(selectors.signupUsernameField).type(uniqueUsername);
    cy.get(selectors.signupPasswordField).type(dados.userNoTransaction.password);
    cy.get(selectors.signupConfirmPassword).type(dados.userNoTransaction.password);
    cy.get(selectors.loginButtonSignup).click();
    cy.url().should("include", "/signin");
    cy.get(selectors.usernameField).type(uniqueUsername);
    cy.get(selectors.passwordField).type(dados.userNoTransaction.password);
    cy.get(selectors.loginButtonSignin).click();
    cy.get(selectors.onboardingNext).should("be.visible").click();
    cy.get(selectors.bankName).type(dados.userNoTransaction.bankName);
    cy.get(selectors.routingNumber).type(dados.userNoTransaction.routingNumber);
    cy.get(selectors.accountNumber).type(dados.userNoTransaction.accountNumber);
    cy.get(selectors.saveButtonBank).click();
    cy.get(selectors.onboardingNext).click();
    cy.get(selectors.navPersonalTab).click();
    cy.get(selectors.emptymessage).should("be.visible").and("contain", "No Transactions");
  });
});
