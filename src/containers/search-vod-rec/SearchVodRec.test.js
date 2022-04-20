import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import * as EventProvider from '../../providers/event-provider/EventProvider';
import vodEventFixture from '../../../fixtures/vod-event';
import SearchVodRec from './SearchVodRec';

const MockSearchVodRec = ({ ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SearchVodRec {...props} />
    </LocalizationProvider>
  );
};

let mockedAddAlert = jest.fn();
jest.mock('../../hooks/useNotification', () => () => ({
  addAlert: mockedAddAlert,
}));

describe('Search Vod Rec', () => {
  let props;
  const searchBtn = 'Search';
  const inputLbl = 'Title';
  const titleToSearch = 'test';
  const selectBtn = 'Select';
  const alertSearchError = {
    title: 'Vod search error',
    text: expect.anything(),
    type: 'error',
    id: expect.anything(),
  };

  beforeEach(() => {
    props = {
      addEvent: jest.fn(),
      handleClose: jest.fn(),
      startDate: '2024-01-24T23:00:00Z',
      removeToken: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Testing Search Method', () => {
    it('Search ok', async () => {
      const mockedSearchVodRec = jest.fn(() => {
        return vodEventFixture.items;
      });
      jest
        .spyOn(EventProvider, 'searchEvent')
        .mockImplementation(mockedSearchVodRec);

      render(<MockSearchVodRec {...props} />);

      await waitFor(() =>
        fireEvent.change(screen.queryByLabelText(inputLbl), {
          target: { value: titleToSearch },
        }),
      );

      const searchButton = screen.getByText(searchBtn);
      await waitFor(() => {
        fireEvent.click(searchButton);
      });
      expect(mockedSearchVodRec).toHaveBeenCalledWith(
        {
          title: titleToSearch,
          type: 'VOD',
          startDate: props.startDate,
        },
        null,
      );
    });

    it('Search ko', async () => {
      const mockedSearchVodRec = jest.fn(() => {
        throw new Error('error');
      });
      jest
        .spyOn(EventProvider, 'searchEvent')
        .mockImplementation(mockedSearchVodRec);

      render(<MockSearchVodRec {...props} />);

      const searchButton = screen.queryByText(searchBtn);
      await waitFor(() =>
        fireEvent.change(screen.queryByLabelText(inputLbl), {
          target: { value: titleToSearch },
        }),
      );

      await waitFor(() => {
        fireEvent.click(searchButton);
        expect(mockedSearchVodRec).toBeCalled();
      });

      await waitFor(() => {
        expect(mockedAddAlert).toHaveBeenCalledWith(alertSearchError);
      });
    });
  });

  describe('Testing Submit Method', () => {
    it('Should submit', async () => {
      const mockedSearchVodRec = jest.fn(() => {
        return vodEventFixture.items;
      });
      jest
        .spyOn(EventProvider, 'searchEvent')
        .mockImplementation(mockedSearchVodRec);

      render(<MockSearchVodRec {...props} />);

      await waitFor(() =>
        fireEvent.change(screen.queryByLabelText(inputLbl), {
          target: { value: titleToSearch },
        }),
      );

      const searchButton = screen.getByText(searchBtn);
      await waitFor(() => {
        fireEvent.click(searchButton);
      });

      const checkbox = screen.queryByRole('checkbox');
      await waitFor(() => fireEvent.click(checkbox));

      const selectButton = screen.queryByText(selectBtn);
      await waitFor(() => {
        fireEvent.click(selectButton);
        expect(props.addEvent).toHaveBeenCalledWith(vodEventFixture.items[0]);
        expect(props.handleClose).toHaveBeenCalled();
      });
    });

    it('Should not submit', async () => {
      const mockedSearchVodRec = jest.fn(() => {
        return vodEventFixture.items;
      });
      jest
        .spyOn(EventProvider, 'searchEvent')
        .mockImplementation(mockedSearchVodRec);

      render(<MockSearchVodRec {...props} />);

      const selectButton = screen.queryByText(selectBtn);
      await waitFor(() => {
        fireEvent.click(selectButton);
        expect(props.addEvent).not.toHaveBeenCalled();
        expect(props.handleClose).not.toHaveBeenCalled();
      });
    });
  });
});
