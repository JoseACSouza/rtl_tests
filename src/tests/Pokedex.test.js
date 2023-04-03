import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';

// EM PROGRESSO

const pokemonName = 'pokemon-name';
const textNextPokemon = 'Próximo Pokémon';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testes relacionados ao Pokedex.js', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const verifyHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered Pokémon',
    });

    expect(verifyHeading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão referente a função for clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const nextPokemon = screen.getByRole('button', {
      name: textNextPokemon,
    });
    const numberOfPokemon = screen.getAllByTestId(pokemonName);
    pokemonList.forEach((pokemon) => {
      const getPokemon = screen.getByTestId(pokemonName);
      expect(getPokemon.innerHTML).toBe(pokemon.name);
      userEvent.click(nextPokemon);
    });
    const firstPokemon = screen.getByTestId(pokemonName);
    expect(firstPokemon.innerHTML).toBe('Pikachu');

    expect(numberOfPokemon).toHaveLength(1);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Teste se os botões de filtragem por tipo são renderizados e possuem o nome correto', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const filterType = screen.getAllByTestId('pokemon-type-button');
    const filterAll = screen.getByRole('button', { name: 'All' });
    const typeNames = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    filterType.forEach((type) => { expect(type).toBeInTheDocument(); });
    expect(filterAll).toBeInTheDocument();
    expect(filterType.map((typeName) => typeName.innerHTML)).toEqual(typeNames);
  });

  it('Teste se os botões de filtragem por tipo são renderizados e possuem o nome correto', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const nextPokemon = screen.getByRole('button', {
      name: textNextPokemon,
    });
    const filterType = screen.getAllByTestId('pokemon-type-button');
    const filterAll = screen.getByRole('button', { name: /all/i });
    const allButtons = screen.getAllByRole('button');
    const typeNames = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const pokemonByType = typeNames.map((type) => {
      const pokemonOfType = pokemonList.filter((pokemon) => pokemon.type === type);
      return ({ [type]: pokemonOfType.map((pokemon) => pokemon.name) });
    });
    console.log(pokemonByType);
    pokemonByType.forEach((element) => {
      const type = Object.keys(element)[0];
      const buttonType = screen.getByRole('button', { name: type });
      userEvent.click(buttonType);
      const pokemon = Object.values(element)[0];
      if (pokemon.length === 0) {
        expect(nextPokemon).toBeDisabled();
      } else {
        pokemon.forEach((thisPokemonName) => {
          const pokemonSelected = screen.getByTestId(pokemonName);
          expect(pokemonSelected).toBeInTheDocument();
          expect(pokemonSelected.innerHTML).toBe(thisPokemonName);

          userEvent.click(nextPokemon);
        });
      }
    });
    filterType.forEach((type) => { expect(type).toBeInTheDocument(); });
    expect(filterAll).toBeInTheDocument();
    expect(allButtons).toHaveLength(9);
    expect(filterType).toHaveLength(7);
    expect(filterType.map((typeName) => typeName.innerHTML)).toEqual(typeNames);
  });

  it('Teste se é possível clicar no botão All', () => {
    renderWithRouter(
      <Pokedex
        pokemonList={ pokemonList }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const filterAll = screen.getByRole('button', { name: /all/i });
    const nextPokemon = screen.getByRole('button', {
      name: textNextPokemon,
    });
    const firstPokemon = screen.getByTestId(pokemonName);
    const electricFilter = screen.getByRole('button', { name: 'Electric' });

    userEvent.click(electricFilter);
    expect(nextPokemon).toBeDisabled();
    expect(firstPokemon.innerHTML).toBe('Pikachu');
    expect(filterAll).toBeInTheDocument();

    userEvent.click(filterAll);
    expect(firstPokemon.innerHTML).toBe('Pikachu');
    expect(nextPokemon).not.toBeDisabled();
    expect(filterAll).toBeInTheDocument();
  });
});
