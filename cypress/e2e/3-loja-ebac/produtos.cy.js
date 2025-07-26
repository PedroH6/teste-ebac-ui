/// <reference types="cypress" />

import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {
    
    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Aether Gym Pant')
        cy.get('#tab-title-description > a').should('contain', 'Descrição')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Eos V-Neck Hoodie'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('Deve visitar a página do produto', () => {
        let produto = 'Ariel Roll Sleeve Sweatshirt'
        produtosPage.visitarProduto(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('Deve adicionar produto ao carrinho', () => {
        let produto = 'Ariel Roll Sleeve Sweatshirt'
        let qtd = 1
        produtosPage.visitarProduto(produto)
        produtosPage.addProdutoCarrinho('M', 'Green', qtd)

        cy.get('.woocommerce-message').should('contain', '“Ariel Roll Sleeve Sweatshirt” foi adicionado no seu carrinho.')
    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
        produtosPage.visitarProduto(dados[1].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[1].tamanho, dados[1].cor, dados[1].quantidade)

        cy.get('.woocommerce-message').should('exist')    
        })
    });
});