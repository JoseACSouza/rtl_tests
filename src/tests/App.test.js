import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes relacionados ao App.js', () => {
  it('Verifica se os links de navegação contém um conjunto fixo de 3 links no App.js', () => {
    renderWithRouter(<App />);
    const verifyNavLink = screen.getByRole('navigation');

    expect(verifyNavLink.childElementCount).toBe(3);
  });

  it('Verifica se os links de navegação são renderizados corretamente (inclusive com a ordem correta) no App.js ', () => {
    renderWithRouter(<App />);
    const verifyNavLink = screen.getByRole('navigation');

    const verifyLinkHome = screen.getByRole('link', { name: 'Home' });
    expect(verifyNavLink.childNodes[0].name).toEqual(verifyLinkHome.name);
    expect(verifyLinkHome).toBeInTheDocument();

    const verifyLinkAbout = screen.getByRole('link', { name: 'About' });
    expect(verifyNavLink.childNodes[1].name).toEqual(verifyLinkAbout.name);
    expect(verifyLinkAbout).toBeInTheDocument();

    const verifyLinkFavPokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(verifyNavLink.childNodes[2].name).toEqual(verifyLinkFavPokemon.name);
    expect(verifyLinkFavPokemon).toBeInTheDocument();
  });

  it('Verifica se Home direciona para o local correto ', () => {
    const { history } = renderWithRouter(<App />);

    const verifyLinkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(verifyLinkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se About direciona para o local correto ', () => {
    const { history } = renderWithRouter(<App />);

    const verifyLinkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(verifyLinkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se Favorite Pokémon direciona para o local correto ', () => {
    const { history } = renderWithRouter(<App />);

    const verifyLinkFavPokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(verifyLinkFavPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se passado uma url inválida renderiza a página NotFound ', () => {
    const { history } = renderWithRouter(<App />);

    const INVALID_URL = '/randomWord';
    act(() => {
      history.push(INVALID_URL);
    });

    const verifyNotFoundPage = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(verifyNotFoundPage).toBeInTheDocument();
  });
});
