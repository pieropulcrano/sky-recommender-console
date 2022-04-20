import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as EventProvider from '../../providers/event-provider/EventProvider';
import linEventFixture from '../../../fixtures/linear-event';
import SearchLinRec from './SearchLinRec';

let mockedAddAlert = jest.fn();

jest.mock('../../hooks/useNotification', () => () => ({
  addAlert: mockedAddAlert,
}));

describe('SearchLinRec', () => {
  const addEvent = jest.fn();
  const handleClose = jest.fn();

  const props = {
    addEvent,
    handleClose,
    resolution: 'SD',
    removeToken: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should handle onSearch error correctly', async () => {
    const mockedSearchEvent = jest.fn(() => {
      throw new Error('error');
    });

    jest
      .spyOn(EventProvider, 'searchEvent')
      .mockImplementation(mockedSearchEvent);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SearchLinRec {...props} />
      </LocalizationProvider>,
    );

    const titleInput = screen.queryByLabelText('Title');
    userEvent.type(titleInput, 'title');

    const dateInput = screen.getByLabelText('Choose date');
    await userEvent.type(dateInput, '20/10/2999 6:00 PM', { delay: 1 });

    const searchButton = screen.queryByText('Search');

    await waitFor(() => {
      fireEvent.click(searchButton);
    });

    expect(mockedSearchEvent).toHaveBeenCalledTimes(1);
    expect(mockedAddAlert).toHaveBeenCalledTimes(1);
    expect(mockedAddAlert).toHaveBeenCalledWith({
      title: 'Vod search error',
      text: expect.anything(),
      type: 'error',
      id: expect.anything(),
    });
  });

  it('should handle onSearch success correctly', async () => {
    const mockedSearchEvent = jest.fn(() => {
      return linEventFixture.items;
    });

    jest
      .spyOn(EventProvider, 'searchEvent')
      .mockImplementation(mockedSearchEvent);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SearchLinRec {...props} />
      </LocalizationProvider>,
    );

    const titleInput = screen.queryByLabelText('Title');
    userEvent.type(titleInput, 'title');

    const dateInput = screen.getByLabelText('Choose date');
    await userEvent.type(dateInput, '20/10/2999 6:00 PM', { delay: 1 });

    const searchButton = screen.queryByText('Search');

    await waitFor(() => {
      fireEvent.click(searchButton);
    });

    expect(mockedSearchEvent).toHaveBeenCalledTimes(1);
    expect(mockedAddAlert).not.toHaveBeenCalled();
  });

  it('should handle onSubmit correctly', async () => {
    const mockedSearchEvent = jest.fn(() => {
      return linEventFixture.items;
    });
    jest
      .spyOn(EventProvider, 'searchEvent')
      .mockImplementation(mockedSearchEvent);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SearchLinRec {...props} />
      </LocalizationProvider>,
    );
    const titleInput = screen.queryByLabelText('Title');
    userEvent.type(titleInput, 'title');

    const dateInput = screen.getByLabelText('Choose date');
    await userEvent.type(dateInput, '20/10/2999 6:00 PM', { delay: 1 });

    const searchButton = screen.getByText('Search');

    await waitFor(() => fireEvent.click(searchButton));

    await waitFor(() => {
      const rowCheckBox = screen.queryByLabelText('Select row');
      fireEvent.click(rowCheckBox);
    });

    const selectButton = screen.queryByText('Select');
    await waitFor(() => fireEvent.click(selectButton));
    expect(addEvent).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
