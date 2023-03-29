import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from './utils/renderWithRouter';

const pokemonList = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
  }, {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: '{measurementUnit: "kg", value: "8.5"}',
    image: 'https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png',
  },
];

describe('Testes relacionados ao FavoritePokemon.js', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    render(<FavoritePokemon />);
    const caseEmptyList = screen.getByText('No favorite Pokémon found');

    expect(caseEmptyList).toBeInTheDocument();
  });

  it('Teste se é exibida na tela apenas os pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
    const numberOfFavoritesPokemon = screen.getAllByTestId('pokemon-name');
    pokemonList.forEach((pokemon) => {
      const { name } = pokemon;
      const searchPokemon = screen.getByText(name);
      expect(searchPokemon).toBeInTheDocument();
    });

    expect(numberOfFavoritesPokemon).toHaveLength(pokemonList.length);
  });
});
