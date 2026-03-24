const selectors = {
  signupUsernameField: '[data-test="signup-username"]',
  signupPasswordField: '[data-test="signup-password"]',
  signupFirstnameField: '[data-test="signup-first-name"]',
  signupLastnameField: "[data-test='signup-last-name']",
  signupConfirmPassword: "[data-test='signup-confirmPassword']",
  loginButtonSignin: '[data-test="signin-submit"]',
  loginButtonSignup: "[data-test='signup-submit']",
  helperText: '#username-helper-text',
  sidenavUser: '[data-test="sidenav-username"]',
  errorMessage: "[data-test='signin-error']",
  signup: "[data-test='signup']",
  
};

describe("New user registration successful", () => {
  let dados;

  beforeEach(() => {
    cy.fixture("user-data").then((user) => {
      dados = user;
    });
    cy.visit("http://localhost:3000/signup");
  });

  it("New user - Valid information", () => {
    cy.get(selectors.signupFirstnameField).type("Monize");
    cy.get(selectors.signupLastnameField).type("Araujo");
    cy.get(selectors.signupUsernameField).type('@MonizeAraujo');
    cy.get(selectors.signupPasswordField).type(dados.userSuccess.password);
    cy.get(selectors.signupConfirmPassword).type(dados.userSuccess.password);
    cy.get(selectors.loginButtonSignup).click();
    cy.url().should("include", "/signin");
    cy.get(selectors.loginButtonSignin).should("be.visible");
  });

  it('Should not allow registration with empty username', () => {

    cy.get(selectors.signupFirstnameField).type('Monize');
    cy.get(selectors.signupLastnameField).type('Araujo');
    cy.get(selectors.signupUsernameField).click();
    cy.get(selectors.signupPasswordField).click();
    cy.get(selectors.helperText).should('be.visible').and('contain', 'Username is required');
    cy.get(selectors.loginButtonSignup).should('be.disabled');
    

  });
});
