import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewInput from './ReviewInput';

describe('Review Input Component', () => {
  const mockSaveFunction = jest.fn();
  const initialProps = {
    products: [{ id: 1, name: 'Product 1' }],
    userData: { user_id: 1, email: 'user@example.com' },
    handleSave: mockSaveFunction,
    selectedProduct: 'Product 1',
    setSelectedProduct: jest.fn(),
    editedReview: { title: '', content: '' },
    setEditedReview: jest.fn(),
    selectedRating: 3,
    setSelectedRating: jest.fn(),
    setIsEditing: jest.fn(),
    isCreate: true,
    setIsCreate: jest.fn(),
  };

  test('Enter the review title and content and click the Save button', () => {
    render(<ReviewInput {...initialProps} />);
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Great product' } });
    const contentInput = screen.getByPlaceholderText('Write up to 100 characters...');
    fireEvent.change(contentInput, { target: { value: 'This product is really good!' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(mockSaveFunction).toHaveBeenCalledTimes(1);
  });
});
