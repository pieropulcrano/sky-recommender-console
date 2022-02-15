import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import * as vodRecProvider from '../../providers/vod-rec-provider/VodRecProvider';
import * as useFallbackVodRec from '../../hooks/useFallbackVodRec';
import UpsertFallbackVodRec from './UpsertFallbackVodRec';
import { prepareFallbackVodRec } from './UpsertFallbackVodRec.helpers';
import fallbackReccMock from '../../../fixtures/fallback-recc-mock.json';

const MockUpsertFallbackVodRec = ({ ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <UpsertFallbackVodRec {...props} />
    </LocalizationProvider>
  );
};

let mockedAddAlert = jest.fn();
jest.mock('../../hooks/useNotification', () => () => ({
  addAlert: mockedAddAlert,
}));

describe('Upsert Fallback Vod Rec', () => {
  let props;
  const updateBtn = 'Update';
  const alertErrorSaving = {
    text: 'An error occurred while saving the Vod Fallback recommendation.',
    title: 'Vod Fallback saving error',
    type: 'error',
    id: expect.anything(),
  };
  const alertErrorLoading = {
    text: 'An error occured during the loading of the fallback vod rec.',
    title: 'Vod Fallback loading failed',
    type: 'warning',
    id: expect.anything(),
  };
  const alertOkSaving = {
    text: 'Vod Fallback was successfully updated.',
    title: ` Vod Fallback updated`,
    type: 'success',
    data_test: 'vod-fallback-ok-not',
    id: expect.anything(),
  };

  beforeEach(() => {
    props = {
      handleAlertFallback: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display loading spinner', async () => {
    render(<MockUpsertFallbackVodRec {...props} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  describe('It should display error notification', () => {
    it('if an error returnig after update', async () => {
      const mockedUpdateFallbackVodRec = jest.fn(() => {
        throw new Error('error');
      });

      jest.spyOn(useFallbackVodRec, 'default').mockImplementation(() => {
        return { data: fallbackReccMock, error: undefined };
      });

      jest
        .spyOn(vodRecProvider, 'updateFallbackVodRec')
        .mockImplementation(mockedUpdateFallbackVodRec);

      render(<MockUpsertFallbackVodRec {...props} />);

      const updateButton = screen.queryByText(updateBtn);

      await waitFor(() => {
        fireEvent.click(updateButton);
        expect(mockedUpdateFallbackVodRec).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(mockedUpdateFallbackVodRec).toHaveBeenCalledWith(
          prepareFallbackVodRec(fallbackReccMock[0].id, fallbackReccMock[0]),
        );
      });

      await waitFor(() => {
        expect(mockedAddAlert).toHaveBeenCalledWith(alertErrorSaving);
      });
    });

    it('if an error returnig during load', async () => {
      jest.spyOn(useFallbackVodRec, 'default').mockImplementation(() => {
        return { data: undefined, error: 'error' };
      });

      render(<MockUpsertFallbackVodRec {...props} />);

      await waitFor(() => {
        expect(mockedAddAlert).toHaveBeenCalledWith(alertErrorLoading);
      });
    });
  });

  describe('It should display ok notification', () => {
    it('if update correctly', async () => {
      jest.spyOn(useFallbackVodRec, 'default').mockImplementation(() => {
        return { data: fallbackReccMock, error: undefined };
      });

      const mockedUpdateFallbackVodRec = jest.fn(() => {
        return {
          updatedFallbackRecommendation: fallbackReccMock[0],
        };
      });

      jest
        .spyOn(vodRecProvider, 'updateFallbackVodRec')
        .mockImplementation(mockedUpdateFallbackVodRec);

      render(<MockUpsertFallbackVodRec {...props} />);

      const updateButton = screen.queryByText(updateBtn);

      await waitFor(() => {
        fireEvent.click(updateButton);
      });

      await waitFor(() => {
        expect(mockedUpdateFallbackVodRec).toHaveBeenCalledTimes(1);
        expect(mockedUpdateFallbackVodRec).toHaveBeenCalledWith(
          prepareFallbackVodRec(fallbackReccMock[0].id, fallbackReccMock[0]),
        );
      });

      await waitFor(() => {
        expect(mockedAddAlert).toHaveBeenCalledWith(alertOkSaving);
      });
    });
  });
});
