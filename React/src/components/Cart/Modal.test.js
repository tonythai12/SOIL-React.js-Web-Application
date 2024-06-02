import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
// Test checks that modal is rendered when isOpen2 is set to true and ensures that clicking the close button calls the "setIsOpen2" function with 'false' closing the modal.
test('Modals must be rendered when isOpen2 is true', () => {
  const selectedProduct = { name: 'Test Product' };
  render(<Modal isOpen2={true} setIsOpen2={() => {}} status={201} selectedProduct={selectedProduct} />);
  expect(screen.getByText('Test Product')).toBeInTheDocument();
});

test('If click the close button, the modal must be closed', () => {
  const setIsOpen2 = jest.fn();
  render(<Modal isOpen2={true} setIsOpen2={setIsOpen2} status={201} selectedProduct={{ name: 'Test Product' }} />);
  fireEvent.click(screen.getByText('Close'));
  expect(setIsOpen2).toHaveBeenCalledWith(false);
});
