import React from 'react';
import { render } from '@testing-library/react';
import Button from '.';

test('renders Button', () => {
  const { getByText } = render(<Button>Hello, World!</Button>);
  const element = getByText('Hello, World!');
  expect(element).toBeDefined();
});
