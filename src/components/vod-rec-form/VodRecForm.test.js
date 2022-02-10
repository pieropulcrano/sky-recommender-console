import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { normalizeVodRec } from '../../containers/upsert-vod-rec/UpsertVodRec.helpers';
import vodRec from '../../../fixtures/vod-recc-mock.json';
import { DEFAULT_VALUES } from './config';
import VodRecForm from './VodRecForm';

const MockVodRecForm = ({ ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <VodRecForm {...props} />
    </LocalizationProvider>
  );
};

describe('Vod Rec Form', () => {
  let props;
  let handleSubmit;
  const clusterLabel = 'Cluster';
  const startDatePlaceHolder = 'Start Date';
  const loadBtn = 'Load';
  const createBtn = 'Create';
  const updateBtn = 'Update';
  const clearBtn = 'Clear';
  const deleteBtn = 'Delete';

  beforeEach(() => {
    handleSubmit = jest.fn();
    props = {
      recId: undefined,
      onSubmit: handleSubmit,
      onDelete: jest.fn(),
      isDeleting: false,
      isSubmitting: false,
      initialValues: DEFAULT_VALUES,
      prevVodRecIsLoading: false,
      loadPrevVodRec: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    render(<MockVodRecForm {...props} />);
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  it('should render correctly with a past recommendation', () => {
    props.recId = 'test-id';
    props.initialValues = {
      cluster: vodRec[0].cluster,
      startDateTime: '1970-12-14T15:00:00Z',
      recommendation: normalizeVodRec(vodRec[0].recommendation),
    };
    render(<MockVodRecForm {...props} />);

    expect(screen.queryByLabelText(clusterLabel)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(startDatePlaceHolder),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(loadBtn)).not.toBeInTheDocument();
    expect(screen.queryByText(createBtn)).not.toBeInTheDocument();
    expect(screen.queryByText(clearBtn)).not.toBeInTheDocument();
    expect(screen.queryByText(updateBtn)).not.toBeInTheDocument();
    expect(screen.queryByText(deleteBtn)).not.toBeInTheDocument();
  });

  it('should render correctly with a recommendation scheduled for the future', () => {
    props.recId = 'test-id';
    props.initialValues = {
      cluster: vodRec[0].cluster,
      startDateTime: '2999-11-14T15:00:00Z',
      recommendation: normalizeVodRec(vodRec[0].recommendation),
    };

    render(<MockVodRecForm {...props} />);

    expect(screen.queryByLabelText(clusterLabel)).toBeInTheDocument();
    expect(screen.queryByLabelText(startDatePlaceHolder)).toBeInTheDocument();
    expect(screen.queryByText(loadBtn)).not.toBeInTheDocument();
    expect(screen.queryByText(createBtn)).not.toBeInTheDocument();
    expect(screen.queryByText(clearBtn)).toBeInTheDocument();
    expect(screen.queryByText(updateBtn)).toBeInTheDocument();
    expect(screen.queryByText(deleteBtn)).toBeInTheDocument();
  });

  describe('should not submit', () => {
    it('if is empty', async () => {
      render(<MockVodRecForm {...props} />);

      const createButton = screen.queryByText(createBtn);
      await waitFor(() => fireEvent.click(createButton));

      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if start date is invalid', async () => {
      props.initialValues = {
        cluster: vodRec[0].cluster,
        startDateTime: 'some-invalid-date',
        recommendation: normalizeVodRec(vodRec[0].recommendation),
      };
      const { container } = render(<MockVodRecForm {...props} />);

      const createButton = screen.queryByText(createBtn);
      await waitFor(() => fireEvent.click(createButton));

      expect(screen.getByText('Invalid date')).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if start date is in the past', async () => {
      props.initialValues = {
        cluster: vodRec[0].cluster,
        startDateTime: '1970-12-14T15:00:00Z',
        recommendation: normalizeVodRec(vodRec[0].recommendation),
      };
      const { container } = render(<MockVodRecForm {...props} />);

      const createButton = screen.queryByText(createBtn);
      await waitFor(() => fireEvent.click(createButton));

      expect(
        screen.getByText('Date cannot be in the past'),
      ).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    it('if Cluster is empty', async () => {
      props.initialValues = {
        cluster: '',
        startDateTime: '2999-12-14T15:00:00Z',
        recommendation: normalizeVodRec(vodRec[0].recommendation),
      };
      const { container } = render(<MockVodRecForm {...props} />);

      const createButton = screen.queryByText(createBtn);
      await waitFor(() => fireEvent.click(createButton));

      expect(screen.getByText('Required')).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass('Mui-error');
      expect(props.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('should submit', () => {
    it('when the user create a new recommendation correctly', async () => {
      props.initialValues = {
        cluster: vodRec[0].cluster,
        startDateTime: '2999-02-02T15:00:00Z',
        recommendation: normalizeVodRec(vodRec[0].recommendation),
      };

      render(<MockVodRecForm {...props} />);

      const createButton = screen.getByText(createBtn);
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
        cluster: vodRec[0].cluster,
        startDateTime: '2999-11-14T15:00:00Z',
        recommendation: normalizeVodRec(vodRec[0].recommendation),
      };

      render(<MockVodRecForm {...props} />);

      const updateButton = screen.queryByText(updateBtn);
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
        cluster: vodRec[0].cluster,
        startDateTime: '2999-11-14T15:00:00Z',
        recommendation: normalizeVodRec(vodRec[0].recommendation),
      };

      render(<MockVodRecForm {...props} />);

      const deleteButton = screen.queryByText(deleteBtn);
      await waitFor(() => fireEvent.click(deleteButton));

      await waitFor(() => {
        expect(props.onDelete).toHaveBeenCalledTimes(1);
        expect(props.onDelete).toHaveBeenCalledWith(props.recId);
      });
    });
  });

  describe('Loading previus vod rec', () => {
    it('should load', async () => {
      props.initialValues = {
        cluster: vodRec[0].cluster,
        startDateTime: '2999-11-14T15:00:00Z',
        recommendation: normalizeVodRec(vodRec[0].recommendation),
      };
      render(<MockVodRecForm {...props} />);

      const loadButton = screen.queryByText(loadBtn);
      await waitFor(() => fireEvent.click(loadButton));
      await waitFor(() => {
        expect(props.loadPrevVodRec).toHaveBeenCalledTimes(1);
      });
    });
  });
});
