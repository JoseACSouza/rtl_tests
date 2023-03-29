import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testes relacionados ao NotFound.js', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found;', () => {
    render(<NotFound />);
    const verifyHeading = screen.getByRole('heading', { name: 'Page requested not found' });

    expect(verifyHeading).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    render(<NotFound />);
    const verifyImage = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(verifyImage).toBeInTheDocument();
    expect(verifyImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
