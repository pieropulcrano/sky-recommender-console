import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { normalizeLinRec } from '../../containers/upsert-lin-rec/UpsertLinRec.helpers';
import pastLinRec from '../../../fixtures/lin-rec-past.json';
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
    props.recId = 'test-id';
    props.initialValues = {
      cluster: pastLinRec[0].cluster,
      startDateTime: pastLinRec[0].validFrom,
      endDateTime: pastLinRec[0].validTo,
      recommendation: normalizeLinRec(pastLinRec[0].recommendation),
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LinRecForm {...props} />
      </LocalizationProvider>,
    );

    expect(screen.queryByLabelText('Cluster')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Start Date')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('End Date')).not.toBeInTheDocument();
    expect(screen.queryByText('Create')).not.toBeInTheDocument();
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
    expect(screen.queryByText('Update')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should render correctly whit a recommendation scheduled for the present', () => {
    props.recId = 'test-id';
    props.initialValues = {
      cluster: pastLinRec[0].cluster,
      startDateTime: '2021-12-14T15:00:00Z',
      endDateTime: '2999-12-14T15:00:00Z',
      recommendation: normalizeLinRec(pastLinRec[0].recommendation),
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LinRecForm {...props} />
      </LocalizationProvider>,
    );

    expect(screen.queryByLabelText('Cluster')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Start Date')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('End Date')).toBeInTheDocument();
    expect(screen.queryByText('Create')).not.toBeInTheDocument();
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
    expect(screen.queryByText('Update')).toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should render correctly whit a recommendation scheduled for the future', () => {
    props.recId = 'test-id';
    props.initialValues = {
      cluster: pastLinRec[0].cluster,
      startDateTime: '2999-11-14T15:00:00Z',
      endDateTime: '2999-12-14T15:00:00Z',
      recommendation: normalizeLinRec(pastLinRec[0].recommendation),
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LinRecForm {...props} />
      </LocalizationProvider>,
    );

    expect(screen.queryByLabelText('Cluster')).toBeInTheDocument();
    expect(screen.queryByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.queryByLabelText('End Date')).toBeInTheDocument();
    expect(screen.queryByText('Create')).not.toBeInTheDocument();
    expect(screen.queryByText('Clear')).toBeInTheDocument();
    expect(screen.queryByText('Update')).toBeInTheDocument();
    expect(screen.queryByText('Delete')).toBeInTheDocument();
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
        cluster: 'C1',
        startDateTime: 'some-invalid-date',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(pastLinRec[0].recommendation),
      };
      const { container } = render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const createButton = screen.queryByText('Create');
      await waitFor(() => fireEvent.click(createButton));

      expect(screen.getByText('Invalid date')).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if end date is invalid', async () => {
      props.initialValues = {
        cluster: 'C1',
        startDateTime: '2012-12-14T15:00:00Z',
        endDateTime: 'some-invalid-date',
        recommendation: normalizeLinRec(pastLinRec[0].recommendation),
      };
      const { container } = render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinRecForm {...props} />
        </LocalizationProvider>,
      );

      const createButton = screen.queryByText('Create');
      await waitFor(() => fireEvent.click(createButton));

      expect(screen.getByText('Invalid date')).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if start date is in the past', async () => {
      props.initialValues = {
        cluster: 'C1',
        startDateTime: '2012-12-14T15:00:00Z',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(pastLinRec[0].recommendation),
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
      expect(container.querySelector('p')).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if end date is not later than the start date', async () => {
      props.initialValues = {
        cluster: 'C1',
        startDateTime: '2999-12-14T15:00:00Z',
        endDateTime: '2998-12-14T15:00:00Z',
        recommendation: normalizeLinRec(pastLinRec[0].recommendation),
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
      expect(container.querySelector('p')).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('should submit', () => {
    it('when the user create a new recommendation correctly', async () => {
      props.initialValues = {
        cluster: 'C1',
        startDateTime: '2998-12-14T15:00:00Z',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(pastLinRec[0].recommendation),
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
        cluster: 'C1',
        startDateTime: '2999-11-14T15:00:00Z',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(pastLinRec[0].recommendation),
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
        cluster: 'C1',
        startDateTime: '2999-11-14T15:00:00Z',
        endDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeLinRec(pastLinRec[0].recommendation),
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
