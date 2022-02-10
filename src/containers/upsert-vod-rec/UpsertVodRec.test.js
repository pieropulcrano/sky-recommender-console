import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as vodRecProvider from '../../providers/vod-rec-provider/VodRecProvider';
import * as useVodRec from '../../hooks/useVodRec';
import UpsertVodRec from './UpsertVodRec';
import vodRecFixture from '../../../fixtures/vod-recc-mock.json';

/**
 * @TODO OnSubmit success / error testata solo tramite e2e: capire come testarla anche qui
 */
const MockUpsertVodRec = ({ ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <UpsertVodRec {...props} />
    </LocalizationProvider>
  );
};
let mockedAddAlert = jest.fn();
jest.mock('../../hooks/useNotification', () => () => ({
  addAlert: mockedAddAlert,
}));

describe('UpsertLinRec', () => {
  let props;
  let vodRec;

  const deleteBtn = 'Delete';
  const updateBtn = 'Update';
  const loadBtn = 'Load';

  const alertErrorLoading = {
    text: 'An error occured during the loading of the vod rec.',
    title: 'Vod loading failed',
    type: 'error',
    id: expect.anything(),
  };
  const alertErrorDelete = {
    text: 'An error occurred while deleting the Vod recommendation.',
    title: 'Vod deleting error',
    type: 'error',
    id: expect.anything(),
  };
  const errorAlertSaving = {
    text: 'An error occurred while saving the Vod recommendation.',
    title: `Vod saving error`,
    type: 'error',
    id: expect.anything(),
  };
  const alertErrorLoadPrevVod = {
    text: 'An error occured during the loading of the previous vod rec.',
    title: 'Vod loading failed',
    type: 'warning',
    id: expect.anything(),
  };
  const alertNoRecordFound = {
    text: 'There are no recommendations prior to the date entered.',
    title: 'Previous Vod Not Found',
    type: 'info',
    id: expect.anything(),
  };
  const alertOkDelete = {
    text: 'Vod was successfully deleted.',
    title: ` Vod Deleted`,
    type: 'success',
    id: expect.anything(),
  };
  const alertOkUpdate = {
    text: 'Vod was successfully updated.',
    title: ` Vod Updated`,
    type: 'success',
    id: expect.anything(),
  };

  beforeEach(() => {
    vodRec = vodRecFixture;
    props = { id: '166', onSuccess: jest.fn() };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Dysplay error', () => {
    it('if an error during the loading of the recommendation', async () => {
      const mockedUseVodRec = jest.fn(() => {
        return { data: undefined, error: 'error' };
      });
      jest.spyOn(useVodRec, 'default').mockImplementation(mockedUseVodRec);

      render(<MockUpsertVodRec {...props} />);

      await waitFor(() => {
        expect(mockedUseVodRec).toHaveBeenCalledTimes(1);
        expect(mockedUseVodRec).toHaveBeenCalledWith(props.id);
        expect(mockedAddAlert).toHaveBeenCalledWith(alertErrorLoading);
      });
    });

    it('if an error during the delete', async () => {
      vodRecFixture[0].validFrom = '2999-12-14T15:00:00Z';
      const mockedDeleteVodRec = jest.fn(() => {
        throw new Error('error');
      });
      jest
        .spyOn(vodRecProvider, 'deleteVodRec')
        .mockImplementation(mockedDeleteVodRec);

      jest.spyOn(useVodRec, 'default').mockImplementation(() => {
        return { data: vodRecFixture, error: undefined };
      });

      render(<MockUpsertVodRec {...props} />);

      const deleteButton = screen.getByText(deleteBtn);

      await waitFor(() => {
        fireEvent.click(deleteButton);
        expect(mockedDeleteVodRec).toHaveBeenCalledTimes(1);
        expect(mockedDeleteVodRec).toHaveBeenCalledWith(props.id);
      });

      await waitFor(() => {
        expect(mockedAddAlert).toHaveBeenCalledTimes(1);
        expect(mockedAddAlert).toHaveBeenCalledWith(alertErrorDelete);
      });
    });

    it('if an error during update', async () => {
      vodRec[0].validFrom = '2100-12-14T15:00:00Z';

      const mockedUpdateVodRec = jest.fn(() => {
        throw new Error('error');
      });

      jest.spyOn(useVodRec, 'default').mockImplementation(() => {
        return { data: vodRec, error: undefined };
      });

      jest
        .spyOn(vodRecProvider, 'updateVodRec')
        .mockImplementation(mockedUpdateVodRec);

      render(<MockUpsertVodRec {...props} />);

      const updateButton = screen.queryByText(updateBtn);
      await waitFor(() => {
        fireEvent.click(updateButton);
        expect(mockedUpdateVodRec).toHaveBeenCalledTimes(1);
      });

      vodRec[0].validFrom = new Date(vodRec[0].validFrom);

      await waitFor(() => {
        expect(mockedUpdateVodRec).toHaveBeenCalledWith(props.id, vodRec[0]);
      });

      await waitFor(() => {
        expect(props.onSuccess).not.toHaveBeenCalled();
        expect(mockedAddAlert).toHaveBeenCalledWith(errorAlertSaving);
      });
    });

    it('if an error occurs during the loading previus rec', async () => {
      delete props['id'];
      const mockedGetPrevVodRec = jest.fn(() => {
        throw new Error('error');
      });
      jest
        .spyOn(vodRecProvider, 'getPrevVodRec')
        .mockImplementation(mockedGetPrevVodRec);

      render(<MockUpsertVodRec {...props} />);

      const dateInput = screen.getByLabelText('Choose date');
      await userEvent.type(dateInput, '20/10/2999 6:00 PM', { delay: 1 });

      const selectCluster = screen.queryByLabelText('Cluster');
      await waitFor(() => {
        fireEvent.mouseDown(selectCluster);
      });

      userEvent.selectOptions(
        screen.getByRole('listbox'),
        screen.getByRole('option', { name: 'Cluster 1' }),
      );

      const loadButton = screen.queryByText(loadBtn);
      await waitFor(() => {
        fireEvent.click(loadButton);
        expect(mockedGetPrevVodRec).toHaveBeenCalledTimes(1);
        expect(mockedAddAlert).toHaveBeenCalledWith(alertErrorLoadPrevVod);
      });
    });

    it('if the loading previus rec no return values', async () => {
      delete props['id'];
      const mockedGetPrevVodRec = jest.fn(() => {
        return [];
      });
      jest
        .spyOn(vodRecProvider, 'getPrevVodRec')
        .mockImplementation(mockedGetPrevVodRec);

      render(<MockUpsertVodRec {...props} />);

      const dateInput = screen.getByLabelText('Choose date');
      await userEvent.type(dateInput, '20/10/2023 6:00 PM', { delay: 1 });

      const selectCluster = screen.queryByLabelText('Cluster');
      await waitFor(() => {
        fireEvent.mouseDown(selectCluster);
      });

      userEvent.selectOptions(
        screen.getByRole('listbox'),
        screen.getByRole('option', { name: 'Cluster 1' }),
      );

      const loadButton = screen.queryByText(loadBtn);
      await waitFor(() => {
        fireEvent.click(loadButton);
      });
      expect(mockedGetPrevVodRec).toHaveBeenCalledTimes(1);
      expect(mockedAddAlert).toHaveBeenCalledWith(alertNoRecordFound);
    });
  });

  describe('Dysplay ok notification', () => {
    it('if delete is ok', async () => {
      vodRecFixture[0].validFrom = '2998-12-14T15:00:00Z';

      const mockedDeleteVodRec = jest.fn(() => {
        return { deletedItem: vodRecFixture };
      });
      jest
        .spyOn(vodRecProvider, 'deleteVodRec')
        .mockImplementation(mockedDeleteVodRec);

      jest.spyOn(useVodRec, 'default').mockImplementation(() => {
        return { data: vodRecFixture, error: undefined };
      });

      render(<MockUpsertVodRec {...props} />);

      const deleteButton = screen.queryByText(deleteBtn);
      await waitFor(() => {
        fireEvent.click(deleteButton);
        expect(mockedDeleteVodRec).toHaveBeenCalledTimes(1);
        expect(mockedDeleteVodRec).toHaveBeenCalledWith(vodRec[0].id);
      });

      await waitFor(() => {
        expect(mockedAddAlert).toHaveBeenCalledWith(alertOkDelete);
        expect(props.onSuccess).toHaveBeenCalledTimes(1);
      });
    });
    it('if update is ok', async () => {
      vodRecFixture[0].validFrom = '2100-12-14T15:00:00Z';

      const mockedUpdateVodRec = jest.fn(() => {
        return {
          updatedRecommendation: vodRecFixture[0],
        };
      });
      jest
        .spyOn(vodRecProvider, 'updateVodRec')
        .mockImplementation(mockedUpdateVodRec);

      jest.spyOn(useVodRec, 'default').mockImplementation(() => {
        return { data: vodRecFixture, error: undefined };
      });

      render(<MockUpsertVodRec {...props} />);

      const updateButton = screen.queryByText(updateBtn);
      await waitFor(() => {
        fireEvent.click(updateButton);
        expect(mockedUpdateVodRec).toHaveBeenCalledTimes(1);
      });

      vodRecFixture[0].validFrom = new Date(vodRecFixture[0].validFrom);

      await waitFor(() => {
        expect(mockedUpdateVodRec).toHaveBeenCalledWith(
          vodRecFixture[0].id,
          vodRecFixture[0],
        );
      });

      await waitFor(() => {
        expect(props.onSuccess).toHaveBeenCalledTimes(1);
        expect(mockedAddAlert).toHaveBeenCalledWith(alertOkUpdate);
      });
    });
  });

  it('should display loading spinner', async () => {
    vodRecFixture[0].validFrom = '2100-12-14T15:00:00Z';

    jest
      .spyOn(useVodRec, 'default')
      .mockImplementation(() =>
        Promise.resolve({ data: vodRecFixture, error: undefined }),
      );

    render(<MockUpsertVodRec {...props} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
