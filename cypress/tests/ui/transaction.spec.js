const selectors = {
  newTransaction: '[data-test="nav-top-new-transaction"]',
  userList: '[data-test="users-list"]',
  amountInput: '[data-test="transaction-create-amount-input"] input',
  descriptionInput: '[data-test="transaction-create-description-input"] input',
  submitPayment: '[data-test="transaction-create-submit-payment"]',
  successMessage: '[data-test="alert-bar-success"]',
  loginButtonSignin: '[data-test="signin-submit"]',
  usernameField: '[data-test="signin-username"]',
  passwordField: '[data-test="signin-password"]',
  balanceValue: '[data-test="sidenav-user-balance"]',
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
    cy.get(selectors.successMessage).should("be.visible").and("contain", "Transaction Submitted");
  });

  // BUG REPORT - CASO 06
  // Título: Permite transação sem saldo suficiente
  // Severidade: Crítica
  // Prioridade: Alta
  // Descrição: O sistema deixa o usuário enviar dinheiro mesmo sem ter saldo disponível
  // Resultado Esperado: O botão "Pay" deveria ser bloqueado ou exibir uma mensagem de erro.
  // Resultado Atual: A transação é feita mesmo sem saldo suficiente resultando em saldo negativo.
  // Obs: O sistema valida apenas campos vazios. Mesmo sem saldo suficiente, o botão "Pay" permanece habilitado,
  //  impedindo a validação da mensagem de erro exigida no requisito.

  it("Sending money with insufficient funds is not allowed. (Bug Found)", () => {
    cy.get(selectors.usernameField).type(dados.userTransaction.sender);
    cy.get(selectors.passwordField).type(dados.userTransaction.password);
    cy.get(selectors.loginButtonSignin).click();
    cy.get(selectors.newTransaction).click();
    cy.contains(dados.userTransaction.recipient).click();
    cy.get(selectors.amountInput).clear().type("100000");
    cy.get(selectors.descriptionInput).type("Testing Insufficient Funds");
    cy.get(selectors.submitPayment).should("be.disabled");
  });
});
