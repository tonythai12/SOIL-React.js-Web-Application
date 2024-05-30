import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddCartBtn from './AddCartBtn';

test('The onClick Handler should be called when the button is clicked', () => {
  const handleClick = jest.fn();
  render(<AddCartBtn onClick={handleClick} />);
  fireEvent.click(screen.getByText('Add to Cart'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
