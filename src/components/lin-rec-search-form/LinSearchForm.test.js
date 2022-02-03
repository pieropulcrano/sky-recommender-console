import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LinSearchForm from './LinRecSearchForm';
import linEvent from '../../../fixtures/lin-event.json';

describe('LinSearchForm', () => {
  const onSubmit = jest.fn();
  const onSearch = jest.fn();

  const props = {
    onSubmit,
    onSearch,
    isSearching: false,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    props.searchResult = [];
  });

  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LinSearchForm {...props} />
      </LocalizationProvider>,
    );

    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  describe('should not submit', () => {
    it("if the user didn't select an event from the result's list", async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LinSearchForm {...props} />
        </LocalizationProvider>,
      );

      const selectButton = screen.queryByText('Select');
      await waitFor(() => fireEvent.click(selectButton));

      expect(
        screen.getByText('Pick a value from the result list.'),
      ).toBeInTheDocument();
      expect(props.onSubmit).not.toHaveBeenCalled();
    });

    describe('should submit', () => {
      it("if the user selected an event from the result's list", async () => {
        props.searchResult = [linEvent];
        render(
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <LinSearchForm {...props} />
          </LocalizationProvider>,
        );

        const rowCheckBox = screen.queryByLabelText('Select Row checkbox');
        await waitFor(() => fireEvent.click(rowCheckBox));

        const selectButton = screen.queryByText('Select');
        await waitFor(() => fireEvent.click(selectButton));
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });
});
