describe('Display Footer', () => {
	it('when user navigates to the footer', () => {
    cy.get('div[name="footer"]')
      .should('be.visible')
      .should('contain', 'Contact Us')
      .should('contain', 'Terms and Conditions')
      .should('contain', 'Privacy Policy')
	})
})