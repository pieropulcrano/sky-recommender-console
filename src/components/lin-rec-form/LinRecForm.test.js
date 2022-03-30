import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { normalizeLinRec } from '../../containers/upsert-lin-rec/UpsertLinRec.helpers';
import linRec from '../../../fixtures/linear-recommendation';
import { DEFAULT_VALUES } from './config';
import LinRecForm from './LinRecForm';

describe('Lin Rec Form', () => {
  let props;
  let handleSubmit;

  beforeEach(() => {
    handleSubmit = jest.fn();
    props = {
      recId: undefined,
      onSubmit: handleSubmit,
      onDelete: jest.fn(),
      isDeleting: false,
      isSubmitting: false,
      initialValues: DEFAULT_VALUES,
      modalTitle: '',
      openModal: true,
      handleOpenModalConfirm: jest.fn(),
      handleCloseModal: jest.fn(),
      confirmOpen: false,
      setConfirmOpen: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LinRecForm {...props} />
      </LocalizationProvider>,
    );
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  it('should render correctly whit a past recommendation', async () => {
    linRec.items[0].validFrom = '1970-12-27T15:00:00Z';
    linRec.items[0].validTo = '1972-12-27T15:00:00Z';
    props.recId = 'test-id';
    props.initialValues = {
      cluster: linRec.items[0].cluster,
      startDateTime: linRec.items[0].validFrom,
      endDateTime: linRec.items[0].validTo,
      recommendation: normalizeLinRec(linRec.items[0].recommendation),
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LinRecForm {...props} />
      </LocalizationProvider>,
    );

    expect(screen.getByDisplayValue(linRec.items[0].cluster)).toBeDisabled();
    expect(screen.queryByLabelText(/Dec 27, 1970/)).toBeDisabled();
    expect(screen.queryByLabelText(/Dec 27, 1972/)).toBeDisabled();
    expect(screen.queryByText('Create')).not.toBeInTheDocument();
    expect(screen.queryByText('Clear')).toBeDisabled();
    expect(screen.queryByText('Update')).toBeDisabled();
    expect(screen.queryByText('Delete')).toBeDisabled();
  });

  it('should render correctly whit a recommendation scheduled for the present', () => {
    props.recId = 'test-id';
    props.initialValues = {
      cluster: linRec.items[0].cluster,
      startDateTime: '2021-12-14T15:00:00Z',
      endDateTime: '2999-12-14T15:00:00Z',
      recommendation: normalizeLinRec(linRec.items[0].recommendation),
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LinRecForm {...props} />
      </LocalizationProvider>,
    );

    expect(screen.getByDisplayValue(linRec.items[0].cluster)).toBeDisabled();
    expect(screen.queryByLabelText(/Dec 14, 2021/)).toBeDisabled();
    expect(screen.queryByLabelText(/Dec 14, 2999/)).not.toBeDisabled();
    expect(screen.queryByText('Create')).not.toBeInTheDocument();
    expect(screen.queryByText('Clear')).toBeDisabled();
    expect(screen.queryByText('Update')).not.toBeDisabled();
    expect(screen.queryByText('Delete')).toBeDisabled();
  });

  it('should render correctly whit a recommendation scheduled for the future', () => {
    props.recId = 'test-id';
    props.initialValues = {
      cluster: linRec.items[0].cluster,
      startDateTime: '2999-11-14T15:00:00Z',
      endDateTime: '2999-12-14T15:00:00Z',
      recommendation: normalizeLinRec(linRec.items[0].recommendation),
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LinRecForm {...props} />
      </LocalizationProvider>,
    );

    expect(
      screen.getByDisplayValue(linRec.items[0].cluster),
    ).not.toBeDisabled();
    expect(screen.queryByLabelText(/Nov 14, 2999/)).not.toBeDisabled();
    expect(screen.queryByLabelText(/Dec 14, 2999/)).not.toBeDisabled();
    expect(screen.queryByText('Create')).not.toBeInTheDocument();
    expect(screen.queryByText('Clear')).not.toBeDisabled();
    expect(screen.queryByText('Update')).not.toBeDisabled();
    expect(screen.queryByText('Delete')).not.toBeDisabled();
  });

  describe('should not submit', () => {
    it('if is empty', async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const createButton = screen.queryByText('Create');
      await waitFor(() => fireEvent.click(createButton));

      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if start date is invalid', async () => {
      props.initialValues = {
        cluster: 'CL_CIN',
        startDateTime: 'some-invalid-date',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(linRec.items[0].recommendation),
      };
      const { container } = render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const createButton = screen.queryByText('Create');
      await waitFor(() => fireEvent.click(createButton));

      expect(screen.getByText('Invalid date')).toBeInTheDocument();
      expect(screen.getByText('Invalid date')).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if end date is invalid', async () => {
      props.initialValues = {
        cluster: 'CL_CIN',
        startDateTime: '2012-12-14T15:00:00Z',
        endDateTime: 'some-invalid-date',
        recommendation: normalizeLinRec(linRec.items[0].recommendation),
      };
      const { container } = render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const createButton = screen.queryByText('Create');
      await waitFor(() => fireEvent.click(createButton));

      expect(screen.getByText('Invalid date')).toBeInTheDocument();
      expect(screen.getByText('Invalid date')).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if start date is in the past', async () => {
      props.initialValues = {
        cluster: 'CL_CIN',
        startDateTime: '2012-12-14T15:00:00Z',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(linRec.items[0].recommendation),
      };
      const { container } = render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const createButton = screen.queryByText('Create');
      await waitFor(() => fireEvent.click(createButton));

      expect(
        screen.getByText('Date cannot be in the past'),
      ).toBeInTheDocument();
      expect(screen.getByText('Date cannot be in the past')).toHaveClass(
        'Mui-error',
      );
      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if end date is not later than the start date', async () => {
      props.initialValues = {
        cluster: 'CL_CIN',
        startDateTime: '2999-12-14T15:00:00Z',
        endDateTime: '2998-12-14T15:00:00Z',
        recommendation: normalizeLinRec(linRec.items[0].recommendation),
      };
      const { container } = render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const createButton = screen.queryByText('Create');
      await waitFor(() => fireEvent.click(createButton));

      expect(
        screen.getByText('End date should be after initial date'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('End date should be after initial date'),
      ).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('should submit', () => {
    it('when the user create a new recommendation correctly', async () => {
      props.initialValues = {
        cluster: 'CL_CIN',
        startDateTime: '2998-12-14T15:00:00Z',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(linRec.items[0].recommendation),
      };

      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const createButton = screen.queryByText('Create');
      await waitFor(() => fireEvent.click(createButton));

      await waitFor(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          ...props.initialValues,
          recommendation: {
            ...DEFAULT_VALUES.recommendation,
            ...props.initialValues.recommendation,
          },
        });
      });
    });

    it('when the user update a recommendation correctly', async () => {
      props.recId = 'test-id';
      props.initialValues = {
        cluster: 'CL_CIN',
        startDateTime: '2999-11-14T15:00:00Z',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(linRec.items[0].recommendation),
      };

      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const updateButton = screen.queryByText('Update');
      await waitFor(() => fireEvent.click(updateButton));

      await waitFor(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          ...props.initialValues,
          recommendation: {
            ...DEFAULT_VALUES.recommendation,
            ...props.initialValues.recommendation,
          },
        });
      });
    });

    it('when the user want to delete recommendation', async () => {
      props.recId = 'test-id';
      props.initialValues = {
        cluster: 'CL_CIN',
        startDateTime: '2999-11-14T15:00:00Z',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(linRec.items[0].recommendation),
      };

      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const deleteButton = screen.queryByText('Delete');
      await waitFor(() => fireEvent.click(deleteButton));

      await waitFor(() => {
        expect(props.onDelete).toHaveBeenCalledTimes(1);
        expect(props.onDelete).toHaveBeenCalledWith(props.recId);
      });
    });
  });
});
