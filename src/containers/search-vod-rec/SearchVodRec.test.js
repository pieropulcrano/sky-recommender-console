import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import * as vodRecProvider from '../../providers/vod-rec-provider/VodRecProvider';
import vodToSearch from '../../../fixtures/vod-to-search-mock.json';
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
    text: 'An error occured during the search process.',
    type: 'error',
    id: expect.anything(),
  };

  beforeEach(() => {
    props = {
      addEvent: jest.fn(),
      handleClose: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Testing Search Method', () => {
    it('Search ok', async () => {
      const mockedSearchVodRec = jest.fn(() => {
        return vodToSearch;
      });
      jest
        .spyOn(vodRecProvider, 'searchVodRec')
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
        expect(mockedSearchVodRec).toHaveBeenCalledWith({
          title: titleToSearch,
          type: 'VOD',
        });
      });
    });

    it('Search ko', async () => {
      const mockedSearchVodRec = jest.fn(() => {
        throw new Error('error');
      });
      jest
        .spyOn(vodRecProvider, 'searchVodRec')
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
        return vodToSearch;
      });
      jest
        .spyOn(vodRecProvider, 'searchVodRec')
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
        expect(props.addEvent).toHaveBeenCalledWith(vodToSearch[0]);
        expect(props.handleClose).toHaveBeenCalled();
      });
    });

    it('Should not submit', async () => {
      const mockedSearchVodRec = jest.fn(() => {
        return vodToSearch;
      });
      jest
        .spyOn(vodRecProvider, 'searchVodRec')
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
