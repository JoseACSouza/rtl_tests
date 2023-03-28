import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../pages/About';

describe('Testes relacionados ao About.js', () => {
  it('Verifica se a página About tem um h2 com o texto About Pokédex', () => {
    render(<About />);
    const verifyHeader = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(verifyHeader).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(secondParagraph).toBeInTheDocument();

    const numberOfParagraph = [firstParagraph, secondParagraph];
    expect(numberOfParagraph).toHaveLength(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    render(<About />);
    const verifyImg = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(verifyImg).toBeInTheDocument();
    expect(verifyImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
