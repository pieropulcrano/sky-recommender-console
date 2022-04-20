import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import * as linRecProvider from '../../providers/lin-rec-provider/LinRecProvider';
import * as useLinRec from '../../hooks/useLinRec';
import UpsertLinRec from './UpsertLinRec';
import linRecFixture from '../../../fixtures/linear-recommendation';

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
  let modalTitle = '';
  let openModal = true;
  let handleOpenModalConfirm = jest.fn();
  let handleCloseModal = jest.fn();
  let mockedRemoveToken = jest.fn();

  beforeEach(() => {
    linRec = linRecFixture;
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
        <UpsertLinRec
          id={id}
          onSuccess={onSuccess}
          modalTitle={modalTitle}
          openModal={openModal}
          handleOpenModalConfirm={handleOpenModalConfirm}
          handleCloseModal={handleCloseModal}
          removeToken={mockedRemoveToken}
        />
      </LocalizationProvider>,
    );

    // await waitFor(() => {
    expect(mockedUseLinRec).toHaveBeenCalledTimes(1);
    expect(mockedUseLinRec).toHaveBeenCalledWith(id, null);
    expect(mockedAddAlert).toHaveBeenCalledTimes(1);
    // });
  });

  it('should handle delete recommendation success correctly', async () => {
    linRec.items[0].validFrom = '2098-12-14T15:00:00Z';
    linRec.items[0].validTo = '2099-12-14T15:00:00Z';
    linRec.items[0].id = id;

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
        <UpsertLinRec
          id={linRec.items[0].id}
          onSuccess={onSuccess}
          modalTitle={modalTitle}
          openModal={openModal}
          handleOpenModalConfirm={handleOpenModalConfirm}
          handleCloseModal={handleCloseModal}
          removeToken={mockedRemoveToken}
        />
      </LocalizationProvider>,
    );

    await waitFor(() => expect(mockedAddAlert).not.toHaveBeenCalled());

    const deleteButton = screen.queryByText('Delete');

    await waitFor(() => {
      fireEvent.click(deleteButton);
      expect(mockedDeleteLinRec).toHaveBeenCalledTimes(1);
      expect(mockedDeleteLinRec).toHaveBeenCalledWith(linRec.items[0].id, null);
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(mockedAddAlert).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle delete recommendation error correctly', async () => {
    linRec.items[0].validFrom = '2998-12-14T15:00:00Z';
    linRec.items[0].validTo = '2999-12-15T15:00:00Z';
    linRec.items[0].id = id;

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
        <UpsertLinRec
          id={linRec.items[0].id}
          onSuccess={onSuccess}
          modalTitle={modalTitle}
          openModal={openModal}
          handleOpenModalConfirm={handleOpenModalConfirm}
          handleCloseModal={handleCloseModal}
          removeToken={mockedRemoveToken}
        />
      </LocalizationProvider>,
    );

    await waitFor(() => expect(mockedAddAlert).not.toHaveBeenCalled());

    const deleteButton = screen.queryByText('Delete');

    await waitFor(() => {
      fireEvent.click(deleteButton);
      expect(mockedDeleteLinRec).toHaveBeenCalledTimes(1);
      expect(mockedDeleteLinRec).toHaveBeenCalledWith(linRec.items[0].id, null);
    });

    await waitFor(() => {
      expect(mockedAddAlert).toHaveBeenCalledTimes(1);
      expect(mockedAddAlert).toHaveBeenCalledWith({
        text: expect.anything(),
        title: `Lin deleting error`,
        type: 'error',
        id: expect.anything(),
      });
    });
  });

  it('should handle update recommendation success correctly', async () => {
    linRec.items[0].validFrom = '2100-12-14T15:00:00Z';
    linRec.items[0].validTo = '2101-12-15T15:00:00Z';
    linRec.items[0].id = id;

    const mockedUpdateLinRec = jest.fn(() => {
      return {
        updatedRecommendation: linRec.items[0],
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
        <UpsertLinRec
          id={linRec.items[0].id}
          onSuccess={onSuccess}
          modalTitle={modalTitle}
          openModal={openModal}
          handleOpenModalConfirm={handleOpenModalConfirm}
          handleCloseModal={handleCloseModal}
          removeToken={mockedRemoveToken}
        />
      </LocalizationProvider>,
    );

    await waitFor(() => expect(mockedAddAlert).not.toHaveBeenCalled());

    const updateButton = screen.queryByText('Update');

    await waitFor(() => {
      fireEvent.click(updateButton);
    });

    expect(mockedUpdateLinRec).toHaveBeenCalledTimes(1);
    expect(mockedUpdateLinRec).toHaveBeenCalledWith(
      linRec.items[0].id,
      {
        cluster: linRec.items[0].cluster,
        recommendation: linRec.items[0].recommendation,
        type: linRec.items[0].type,
        validFrom: linRec.items[0].validFrom,
        validTo: linRec.items[0].validTo,
      },
      null,
    );

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
    linRec.items[0].validFrom = '2100-12-14T15:00:00Z';
    linRec.items[0].validTo = '2101-12-15T15:00:00Z';
    linRec.items[0].id = id;

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
        <UpsertLinRec
          id={linRec.items[0].id}
          onSuccess={onSuccess}
          modalTitle={modalTitle}
          openModal={openModal}
          handleOpenModalConfirm={handleOpenModalConfirm}
          handleCloseModal={handleCloseModal}
          removeToken={mockedRemoveToken}
        />
      </LocalizationProvider>,
    );

    await waitFor(() => expect(mockedAddAlert).not.toHaveBeenCalled());

    const updateButton = screen.queryByText('Update');
    await waitFor(() => {
      fireEvent.click(updateButton);
    });

    expect(mockedUpdateLinRec).toHaveBeenCalledTimes(1);
    expect(mockedUpdateLinRec).toHaveBeenCalledWith(
      linRec.items[0].id,
      {
        cluster: linRec.items[0].cluster,
        recommendation: linRec.items[0].recommendation,
        type: linRec.items[0].type,
        validFrom: linRec.items[0].validFrom,
        validTo: linRec.items[0].validTo,
      },
      null,
    );

    await waitFor(() => {
      expect(onSuccess).not.toHaveBeenCalled();
      expect(mockedAddAlert).toHaveBeenCalledWith({
        text: expect.anything(),
        title: 'Lin saving error',
        type: 'error',
        id: expect.anything(),
      });
    });
  });

  it('should display loading spinner', async () => {
    linRec.items[0].validFrom = '2100-12-14T15:00:00Z';
    linRec.items[0].validTo = '2101-12-15T15:00:00Z';
    linRec.items[0].id = id;

    jest
      .spyOn(useLinRec, 'default')
      .mockImplementation(() =>
        Promise.resolve({ data: linRec, error: undefined }),
      );

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UpsertLinRec
          id={linRec.items[0].id}
          onSuccess={onSuccess}
          modalTitle={modalTitle}
          openModal={openModal}
          handleOpenModalConfirm={handleOpenModalConfirm}
          handleCloseModal={handleCloseModal}
          removeToken={mockedRemoveToken}
        />
      </LocalizationProvider>,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
