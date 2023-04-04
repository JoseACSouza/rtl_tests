import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import Pokemon from '../components/Pokemon';

const pikachuInfo = pokemonList[0];

describe('Testes relacionados ao Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pikachuInfo }
        isFavorite
      />,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe(pikachuInfo.name);

    const pokemonType = screen.getByText(pikachuInfo.type);
    expect(pokemonType).toBeInTheDocument();

    const { value, measurementUnit } = pikachuInfo.averageWeight;
    const pokemonweight = screen.getByTestId('pokemon-weight');
    expect(pokemonweight).toBeInTheDocument();
    expect(pokemonweight.innerHTML).toBe(
      `Average weight: ${value} ${measurementUnit}`,
    );

    const pokemonImg = screen.getByRole('img', { name: `${pikachuInfo.name} sprite` });
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe(pikachuInfo.image);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pikachuInfo }
        isFavorite
      />,
    );
    const infoLink = screen.getByRole('link', { name: /more details/i });
    expect(infoLink).toBeInTheDocument();

    userEvent.click(infoLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${pikachuInfo.id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    let isFavorite = true;
    renderWithRouter(
      <Pokemon
        pokemon={ pikachuInfo }
        isFavorite={ isFavorite }
      />,
    );
    const favoriteImg = screen.getByRole('img', { name: `${pikachuInfo.name} is marked as favorite` });
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg.src).toContain('/star-icon.svg');

    isFavorite = false;
    renderWithRouter(
      <Pokemon
        pokemon={ pikachuInfo }
        isFavorite={ isFavorite }
      />,
    );
  });
});
