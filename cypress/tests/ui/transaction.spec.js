const selectors = {
  newTransaction: '[data-test="nav-top-new-transaction"]',
  userList: '[data-test="users-list"]',
  amountInput: '[data-test="transaction-create-amount-input"]',
  descriptionInput: '[data-test="transaction-create-description-input"]',
  submitPayment: '[data-test="transaction-create-submit-payment"]',
  successMessage: '[data-test="alert-bar-success"]',
  loginButtonSignin: '[data-test="signin-submit"]',
  usernameField: '[data-test="signin-username"]',
  passwordField: '[data-test="signin-password"]',
  balanceValue: '[data-test="sidenav-user-balance"]',
  //errorMessage: '.Mui-error'
};

describe("Functionality: Send Money", () => {
  let dados;

  beforeEach(() => {
    cy.fixture("user-data").then((f) => {
      dados = f;
    });
    cy.visit("http://localhost:3000/signin");
  });
  it("Send money with sufficient balance", () => {
    cy.get(selectors.usernameField).type(dados.userTransaction.sender);
    cy.get(selectors.passwordField).type(dados.userTransaction.password);
    cy.get(selectors.loginButtonSignin).click();
    cy.get(selectors.balanceValue).should("be.visible");
    cy.get(selectors.newTransaction).click();
    cy.contains(dados.userTransaction.recipient).click();
    cy.get(selectors.amountInput).type(dados.userTransaction.amount);
    cy.get(selectors.descriptionInput).type(dados.userTransaction.description);
    cy.get(selectors.submitPayment).click();
    cy.get(selectors.successMessage).should("be.visible")
  });
});
