import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import * as linRecProvider from '../../providers/lin-rec-provider/LinRecProvider';
import * as useLinRec from '../../hooks/useLinRec';
import UpsertLinRec from './UpsertLinRec';
import linRecFuture from '../../../fixtures/lin-rec-future-mock';

/**
 * @TODO OnSubmit success / error testata solo tramite e2e: capire come testarla anche qui
 */

let mockedAddAlert = jest.fn();
jest.mock('../../hooks/useNotification', () => () => ({
  addAlert: mockedAddAlert,
}));

describe('UpsertLinRec', () => {
  let id = '1';
  let onSuccess = jest.fn();
  let linRec;

  beforeEach(() => {
    linRec = linRecFuture;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display an error notification if an error occurs during the loading of the requested recommendation', async () => {
    const mockedUseLinRec = jest.fn(() => {
      return { data: undefined, error: 'error' };
    });

    jest.spyOn(useLinRec, 'default').mockImplementation(mockedUseLinRec);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UpsertLinRec id={id} onSuccess={onSuccess} />
      </LocalizationProvider>,
    );

    await waitFor(() => {
      expect(mockedUseLinRec).toHaveBeenCalledTimes(1);
      expect(mockedUseLinRec).toHaveBeenCalledWith(id);
      expect(mockedAddAlert).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle delete recommendation success correctly', async () => {
    linRec[0].validFrom = '2098-12-14T15:00:00Z';
    linRec[0].validTo = '2099-12-14T15:00:00Z';

    const mockedDeleteLinRec = jest.fn(() => {
      return { deletedItem: linRec };
    });

    jest.spyOn(useLinRec, 'default').mockImplementation(() => {
      return { data: linRec, error: undefined };
    });

    jest
      .spyOn(linRecProvider, 'deleteLinRec')
      .mockImplementation(mockedDeleteLinRec);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UpsertLinRec id={linRec[0].id} onSuccess={onSuccess} />
      </LocalizationProvider>,
    );

    await waitFor(() => expect(mockedAddAlert).not.toHaveBeenCalled());

    const deleteButton = screen.queryByText('Delete');

    await waitFor(() => {
      fireEvent.click(deleteButton);
      expect(mockedDeleteLinRec).toHaveBeenCalledTimes(1);
      expect(mockedDeleteLinRec).toHaveBeenCalledWith(linRec[0].id);
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(mockedAddAlert).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle delete recommendation error correctly', async () => {
    linRec[0].validFrom = '2998-12-14T15:00:00Z';
    linRec[0].validTo = '2999-12-15T15:00:00Z';

    const mockedDeleteLinRec = jest.fn(() => {
      throw new Error('error');
    });

    jest.spyOn(useLinRec, 'default').mockImplementation(() => {
      return { data: linRec, error: undefined };
    });

    jest
      .spyOn(linRecProvider, 'deleteLinRec')
      .mockImplementation(mockedDeleteLinRec);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UpsertLinRec id={linRec[0].id} onSuccess={onSuccess} />
      </LocalizationProvider>,
    );

    await waitFor(() => expect(mockedAddAlert).not.toHaveBeenCalled());

    const deleteButton = screen.queryByText('Delete');

    await waitFor(() => {
      fireEvent.click(deleteButton);
      expect(mockedDeleteLinRec).toHaveBeenCalledTimes(1);
      expect(mockedDeleteLinRec).toHaveBeenCalledWith(linRec[0].id);
    });

    await waitFor(() => {
      expect(mockedAddAlert).toHaveBeenCalledTimes(1);
      expect(mockedAddAlert).toHaveBeenCalledWith({
        text: 'An error occurred while deleting the Lin recommendation.',
        title: `Lin deleting error`,
        type: 'error',
        id: expect.anything(),
      });
    });
  });

  it('should handle update recommendation success correctly', async () => {
    linRec[0].validFrom = '2100-12-14T15:00:00Z';
    linRec[0].validTo = '2101-12-15T15:00:00Z';

    const mockedUpdateLinRec = jest.fn(() => {
      return {
        updatedRecommendation: linRec[0],
      };
    });

    jest.spyOn(useLinRec, 'default').mockImplementation(() => {
      return { data: linRec, error: undefined };
    });

    jest
      .spyOn(linRecProvider, 'updateLinRec')
      .mockImplementation(mockedUpdateLinRec);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UpsertLinRec id={linRec[0].id} onSuccess={onSuccess} />
      </LocalizationProvider>,
    );

    await waitFor(() => expect(mockedAddAlert).not.toHaveBeenCalled());

    const updateButton = screen.queryByText('Update');

    await waitFor(() => {
      fireEvent.click(updateButton);
      expect(mockedUpdateLinRec).toHaveBeenCalledTimes(1);
    });

    linRec[0].validFrom = new Date(linRec[0].validFrom);
    linRec[0].validTo = new Date(linRec[0].validTo);

    await waitFor(() => {
      expect(mockedUpdateLinRec).toHaveBeenCalledWith(linRec[0].id, linRec[0]);
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(mockedAddAlert).toHaveBeenCalledWith({
        text: 'Lin was successfully updated.',
        title: ` Lin Updated`,
        type: 'success',
        id: expect.anything(),
      });
    });
  });

  it('should handle update recommendation delete correctly', async () => {
    linRec[0].validFrom = '2100-12-14T15:00:00Z';
    linRec[0].validTo = '2101-12-15T15:00:00Z';

    const mockedUpdateLinRec = jest.fn(() => {
      throw new Error('error');
    });

    jest.spyOn(useLinRec, 'default').mockImplementation(() => {
      return { data: linRec, error: undefined };
    });

    jest
      .spyOn(linRecProvider, 'updateLinRec')
      .mockImplementation(mockedUpdateLinRec);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UpsertLinRec id={linRec[0].id} onSuccess={onSuccess} />
      </LocalizationProvider>,
    );

    await waitFor(() => expect(mockedAddAlert).not.toHaveBeenCalled());

    const updateButton = screen.queryByText('Update');

    await waitFor(() => {
      fireEvent.click(updateButton);
      expect(mockedUpdateLinRec).toHaveBeenCalledTimes(1);
    });

    linRec[0].validFrom = new Date(linRec[0].validFrom);
    linRec[0].validTo = new Date(linRec[0].validTo);

    await waitFor(() => {
      expect(mockedUpdateLinRec).toHaveBeenCalledWith(linRec[0].id, linRec[0]);
    });

    await waitFor(() => {
      expect(onSuccess).not.toHaveBeenCalled();
      expect(mockedAddAlert).toHaveBeenCalledWith({
        text: 'An error occurred while saving the Lin recommendation.',
        title: 'Lin saving error',
        type: 'error',
        id: expect.anything(),
      });
    });
  });

  it('should display loading spinner', async () => {
    linRec[0].validFrom = '2100-12-14T15:00:00Z';
    linRec[0].validTo = '2101-12-15T15:00:00Z';

    jest
      .spyOn(useLinRec, 'default')
      .mockImplementation(() =>
        Promise.resolve({ data: linRec, error: undefined }),
      );

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UpsertLinRec id={linRec[0].id} onSuccess={onSuccess} />
      </LocalizationProvider>,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
