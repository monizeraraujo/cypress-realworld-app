
const selectors = {
  usernameField: '[data-test="signin-username"]',
  passwordField: '[data-test="signin-password"]',
  loginButtonSignin: '[data-test="signin-submit"]',
  sidenavUser: '[data-test="sidenav-username"]',
  errorMessage: "[data-test='signin-error']"
};


describe('Login - RWA', () => {
  let dados; 

  beforeEach(() => {
    cy.fixture('user-data').then((user) => {dados = user;});
    cy.visit('http://localhost:3000/signin');
  });

  it('Login - Success!', () => {
    cy.get(selectors.usernameField).type(dados.userSuccess.username);
    cy.get(selectors.passwordField).type(dados.userSuccess.password);
    cy.get(selectors.loginButtonSignin).click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get(selectors.sidenavUser).should('contain', dados.userSuccess.username);
  });

  it('Login - Fail!', () => {
    cy.get(selectors.usernameField).type(dados.userFail.username);
    cy.get(selectors.passwordField).type(dados.userFail.password);
    cy.get(selectors.loginButtonSignin).click();
    cy.get(selectors.errorMessage).should('be.visible');
    cy.url().should('include', '/signin');
  });
});