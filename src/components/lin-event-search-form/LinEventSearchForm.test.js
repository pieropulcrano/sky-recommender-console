import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LinEventSearchForm from './LinEventSearchForm';

describe('LinEventSearchForm', () => {
  const onSubmit = jest.fn();

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LinEventSearchForm onSubmit={onSubmit} />
      </LocalizationProvider>,
    );
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  describe('should not submit', () => {
    it('if is empty', async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinEventSearchForm onSubmit={onSubmit} />
        </LocalizationProvider>,
      );

      const searchButton = screen.queryByText('Search');
      await waitFor(() => fireEvent.click(searchButton));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('if endDate is not provided', async () => {
      const { container } = render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinEventSearchForm onSubmit={onSubmit} />
        </LocalizationProvider>,
      );

      const titleInput = screen.queryByLabelText('Title');
      userEvent.type(titleInput, 'title to search');
      const searchButton = screen.queryByText('Search');
      await waitFor(() => fireEvent.click(searchButton));

      expect(onSubmit).not.toHaveBeenCalled();
      expect(screen.getByText('Invalid date')).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass('Mui-error');
    });

    it('if endDate is invalid', async () => {
      const { container } = render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinEventSearchForm onSubmit={onSubmit} />
        </LocalizationProvider>,
      );

      const titleInput = screen.queryByLabelText('Title');
      userEvent.type(titleInput, 'title to search');

      const dateInput = await container.querySelector('input');
      await userEvent.type(dateInput, 'invalid date', { delay: 1 });

      const searchButton = screen.queryByText('Search');
      await waitFor(() => fireEvent.click(searchButton));

      expect(onSubmit).not.toHaveBeenCalled();
      expect(screen.getByText('Invalid date')).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass('Mui-error');
    });
  });

  describe('should submit', () => {
    it('when the user fill the form', async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinEventSearchForm onSubmit={onSubmit} />
        </LocalizationProvider>,
      );

      const titleInput = screen.queryByLabelText('Title');
      userEvent.type(titleInput, 'title to search');

      const dateInput = screen.getByLabelText('Choose date');
      await userEvent.type(dateInput, '20/10/2022 6:00 PM', { delay: 1 });

      const searchButton = screen.queryByText('Search');
      await waitFor(() => fireEvent.click(searchButton));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
