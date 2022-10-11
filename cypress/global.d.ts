declare namespace Cypress {
  interface Chainable<Subject> {
    setMobileViewport(): Chainable<Subject>;
    setTabletViewport(): Chainable<Subject>;
    setDesktopViewport(): Chainable<Subject>;
  }
}
