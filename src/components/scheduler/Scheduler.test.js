import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import * as recProvider from '../../providers/rec-provider/RecProvider';
import recommendations from '../../../fixtures/recomendation-mock.json';
import Scheduler from './Scheduler';

/**
 * @TODO add test for edit lin recommendation
 */

let mockedAddAlert = jest.fn();

jest.mock('../../hooks/useNotification', () => () => ({
  addAlert: mockedAddAlert,
}));

describe('Scheduler', () => {
  let mockedGetRec;

  const recommendationsForCurrentMonth = recommendations.map(
    (recommendation) => {
      const date = new Date();
      recommendation.validFrom = date.toUTCString();
      recommendation.validTo = date.toUTCString();
      return recommendation;
    },
  );

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display an error notification if an error occurs during the fetching of recommendations', async () => {
    mockedGetRec = jest.fn(() => new Error('error'));
    jest.spyOn(recProvider, 'getRec').mockImplementation(mockedGetRec);
    /** mock useless console.warn */
    jest.spyOn(global.console, 'warn').mockImplementation();

    render(<Scheduler />);

    await waitFor(() => {
      expect(mockedAddAlert).toHaveBeenCalledTimes(1);
      expect(mockedAddAlert).toHaveBeenCalledWith({
        text: 'An error occured during the loading of the scheduled recommendations.',
        title: 'Recommendations loading failed',
        type: 'error',
        id: expect.anything(),
      });
    });
  });

  it('should render all fetched recommendations', async () => {
    mockedGetRec = jest.fn(() => recommendationsForCurrentMonth);
    jest.spyOn(recProvider, 'getRec').mockImplementation(mockedGetRec);

    render(<Scheduler />);

    await waitFor(() => {
      expect(mockedAddAlert).not.toHaveBeenCalled();
    });

    recommendationsForCurrentMonth.forEach(async (rec) =>
      expect(
        await screen.findByTestId(`eventId-${rec.id}`),
      ).toBeinTheDocument(),
    );
  });

  it('should open the modal with the form to create a vod recommendation', async () => {
    mockedGetRec = jest.fn(() => []);
    jest.spyOn(recProvider, 'getRec').mockImplementation(mockedGetRec);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Scheduler />
      </LocalizationProvider>,
    );

    const newVodButton = screen.getByText('NEW VOD');

    fireEvent.click(newVodButton);

    await waitFor(() => {
      expect(
        document.querySelector('[data-test="scheduler-modal"]'),
      ).not.toBeNull();
      expect(
        document.querySelector('[data-test="form-upsert-rec-vod"]'),
      ).not.toBeNull();
    });
  });

  it('should open the modal with the form to create a lin recommendation', async () => {
    mockedGetRec = jest.fn(() => []);
    jest.spyOn(recProvider, 'getRec').mockImplementation(mockedGetRec);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Scheduler />
      </LocalizationProvider>,
    );

    const newVodButton = screen.getByText('NEW LIN');

    fireEvent.click(newVodButton);

    await waitFor(() => {
      expect(
        document.querySelector('[data-test="scheduler-modal"]'),
      ).not.toBeNull();
      expect(screen.getByTestId('form-upsert-rec-lin')).not.toBeNull();
    });
  });

  it('should display the loading spinner', async () => {
    mockedGetRec = jest.fn(() => []);
    jest.spyOn(recProvider, 'getRec').mockImplementation(mockedGetRec);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Scheduler />
      </LocalizationProvider>,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
