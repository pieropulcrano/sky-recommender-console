import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import VodRecFallbackForm from './VodRecFallbackForm';
import fallbackRecommendationFixture from '../../../fixtures/fallback-recommendation';

describe('VodRecFallbackForm', () => {
  let props;
  let onSubitMock = jest.fn();

  it('should render', () => {
    props = {
      onSubmit: onSubitMock,
      initialValues: fallbackRecommendationFixture.items[0],
      isSubmitting: false,
      removeToken: jest.fn(),
    };

    render(<VodRecFallbackForm {...props} />);
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  it('should not save if empty', async () => {
    props = {
      onSubmit: onSubitMock,
      initialValues: { id: '9999', type: 'FALLBACK', recommendation: [] },
      isSubmitting: false,
      removeToken: jest.fn(),
    };

    render(<VodRecFallbackForm {...props} />);
    const updateButton = screen.getByText(/update/i);

    await act(async () => {
      await fireEvent.click(updateButton);
    });

    expect(onSubitMock).not.toHaveBeenCalled();
  });
});
