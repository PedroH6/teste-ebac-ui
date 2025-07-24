/// <reference types="cypress" />

describe('Funcionalidade: Login', () => {
    beforeEach(() => {
          cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('pedroteste@teste.com.br')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, pedroteste (não é pedroteste? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('pedro@teste.com.br')
        cy.get('#password').type('teste123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.' )
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir uma senha inválida', () => {
        cy.get('#username').type('pedroteste@teste.com.br')
        cy.get('#password').type('teste1ph23')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail pedroteste@teste.com.br está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')

    });
})



