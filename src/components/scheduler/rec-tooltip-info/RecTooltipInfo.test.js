import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecTooltipInfo from './RecTooltipInfo';

describe('RecTooltipInfo', () => {
  let props = {
    recommendation: [
      {
        id: '1',
        title: 'title-1',
        position: '1',
      },
      {
        id: '2',
        title: 'title-2',
        position: '2',
      },
    ],
    title: 'title',
    startDateTime: '2021-12-24T12:00:00Z',
    endDateTime: '2022-12-24T12:00:00Z',
  };

  it('should render the text', () => {
    render(<RecTooltipInfo {...props} />);
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  it('should appears when the user hover on it', async () => {
    render(<RecTooltipInfo {...props} />);
    const tooltipText = screen.getByText('title');
    await userEvent.hover(tooltipText);

    expect(await screen.findByText(/Start/)).toBeInTheDocument();
    expect(await screen.findByText(/End/)).toBeInTheDocument();
    expect(document.body.childNodes).toMatchSnapshot();
  });
});
