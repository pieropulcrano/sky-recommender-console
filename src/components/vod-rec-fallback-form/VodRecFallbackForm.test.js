import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import VodRecFallbackForm from './VodRecFallbackForm';
import {fallbackRecMock} from './fallback-rec-mock';



describe('VodRecFallbackForm', () => {

  let props;
  it('should render', () => {
    props = {
      onSubmit: jest.fn(),
      initialValues: fallbackRecMock,
      isSubmitting: false,
    };
    render(<VodRecFallbackForm {...props} />);
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });


  it('should not save if empty', async () => {

    props = {
      onSubmit: jest.fn(),
      initialValues: { id: '5', type: 'FALLBACK', recommendation: [] },
      isSubmitting: false,
    };

    render(<VodRecFallbackForm {...props} />);
    const updateButton = screen.getByText(/update/i);

    await act(async () => {
      await fireEvent.click(updateButton);
    });
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });
});


