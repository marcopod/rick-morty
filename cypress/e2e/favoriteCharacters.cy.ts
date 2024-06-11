/// <reference types="cypress" />

const favoriteCharacters = [
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

describe('FavoriteCharacters Component', () => {
  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear();
  });

  it('displays loading message initially', () => {
    cy.visit('/favorites'); // Adjust the path to where the FavoriteCharacters component is rendered
    cy.contains('Loading your favorite characters...').should('be.visible');
  });

  it('displays favorite characters after loading', () => {
    // Mock the API response using intercept
    cy.intercept('GET', '/api/findCharacter/1', {
      statusCode: 200,
      body: favoriteCharacters[0],
    }).as('getCharacter1');
    cy.intercept('GET', '/api/findCharacter/2', {
      statusCode: 200,
      body: favoriteCharacters[1],
    }).as('getCharacter2');

    // Set favorites in session storage
    sessionStorage.setItem('favorites', JSON.stringify([1, 2]));

    // Visit the page containing the FavoriteCharacters component
    cy.visit('/favorites'); // Adjust the path to where the FavoriteCharacters component is rendered

    cy.wait('@getCharacter1');
    cy.wait('@getCharacter2');

    cy.contains('Your Favorite Characters').should('be.visible');
    cy.contains('Rick Sanchez').should('be.visible');
    cy.contains('Morty Smith').should('be.visible');
    cy.get('img[src="https://example.com/rick.png"]').should('be.visible');
    cy.get('img[src="https://example.com/morty.png"]').should('be.visible');
  });

  it('displays message when no favorite characters are selected', () => {
    cy.visit('/favorites'); // Adjust the path to where the FavoriteCharacters component is rendered
    cy.contains('No favorite characters selected.').should('be.visible');
  });

  it('handles errors during fetch', () => {
    // Mock the API response to fail
    cy.intercept('GET', '/api/findCharacter/1', {
      statusCode: 500,
      body: { error: 'Internal server error' },
    }).as('getCharacter1Error');

    // Set favorites in session storage
    sessionStorage.setItem('favorites', JSON.stringify([1]));

    // Visit the page containing the FavoriteCharacters component
    cy.visit('/favorites'); // Adjust the path to where the FavoriteCharacters component is rendered

    cy.wait('@getCharacter1Error');

    cy.contains('Loading your favorite characters...').should('not.exist');
    cy.contains('No favorite characters selected.').should('not.exist');
    cy.contains('Rick Sanchez').should('not.exist');
  });
});
