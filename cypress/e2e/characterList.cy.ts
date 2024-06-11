/// <reference types="cypress" />

const character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://example.com/rick.png',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

describe('Character Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/findCharacter/1', {
      statusCode: 200,
      body: character,
    }).as('getCharacter');

    cy.visit('/c/1', { failOnStatusCode: false });
  });

  it('displays loading message initially', () => {
    cy.contains('Loading character...').should('be.visible');
  });

  it('displays character after loading', () => {
    cy.wait('@getCharacter');
    cy.contains(character.name).should('be.visible');
    cy.contains(character.species).should('be.visible');
    cy.contains(character.gender).should('be.visible');
    cy.contains(character.location.name).should('be.visible');
    cy.get('img').should('have.attr', 'src', character.image);
  });

  it('handles errors during fetch', () => {
    cy.intercept('GET', '/api/findCharacter/1', {
      statusCode: 500,
      body: { error: 'Internal server error' },
    }).as('getCharacterError');

    cy.visit('/c/1', { failOnStatusCode: false });
    cy.wait('@getCharacterError');
    cy.contains('Error fetching character: Network response was not ok').should(
      'be.visible'
    );
  });

  it('navigates back to all characters', () => {
    cy.wait('@getCharacter');
    cy.contains('Click to see all the characters').click();
    cy.url().should('include', '/');
  });
});
