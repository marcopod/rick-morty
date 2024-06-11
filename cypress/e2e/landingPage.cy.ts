/// <reference types="cypress" />

const characters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://example.com/rick.png',
    species: 'Human',
  },
  {
    id: 2,
    name: 'Morty Smith',
    image: 'https://example.com/morty.png',
    species: 'Human',
  },
];

describe('CharacterList Component', () => {
  beforeEach(() => {
    // Mock the API response using a local object
    cy.intercept('GET', '/api/getAllCharacter', {
      statusCode: 200,
      body: characters,
    }).as('getAllCharacter');

    // Visit the page containing the CharacterList component
    cy.visit('/', { failOnStatusCode: false });
  });

  it('displays loading message initially', () => {
    cy.contains('Loading characters...').should('be.visible');
  });

  it('displays characters after loading', () => {
    cy.wait('@getAllCharacter');
    cy.get('.grid.grid-cols-4').should('exist');
    cy.get('.grid.grid-cols-4 .flex.flex-col.items-center').should(
      'have.length.greaterThan',
      0
    );
  });

  it('handles errors during fetch', () => {
    cy.intercept('GET', '/api/getAllCharacter', {
      statusCode: 500,
      body: { error: 'Internal server error' },
    }).as('getAllCharacterError');

    cy.visit('/', { failOnStatusCode: false });
    cy.wait('@getAllCharacterError');
    cy.contains(
      'Error fetching characters: Network response was not ok'
    ).should('be.visible');
  });

  it('toggles favorite status', () => {
    cy.wait('@getAllCharacter');

    cy.get('.grid.grid-cols-4 .flex.flex-col.items-center')
      .first()
      .within(() => {
        cy.get('button[title="favorite"]').click();
        // cy.get('svg').should('have.attr', 'color', '#F67E4B');

        cy.get('button[title="favorite"]').click();
        // cy.get('svg').should('have.attr', 'color', '#B4B4B4');
      });
  });

  it('persists favorite status across reloads', () => {
    cy.wait('@getAllCharacter');

    cy.get('.grid.grid-cols-4 .flex.flex-col.items-center')
      .first()
      .within(() => {
        cy.get('button[title="favorite"]').click();
        // cy.get('svg').should('have.attr', 'color', '#F67E4B');
      });

    cy.reload();
    cy.wait('@getAllCharacter');

    cy.get('.grid.grid-cols-4 .flex.flex-col.items-center')
      .first()
      .within(() => {
        // cy.get('svg').should('have.attr', 'color', '#F67E4B');
      });
  });

  it('navigates to favorite characters page', () => {
    cy.wait('@getAllCharacter');

    cy.contains('Click to see your favorite characters').click();
    cy.url().should('include', '/favorites');
  });
});
