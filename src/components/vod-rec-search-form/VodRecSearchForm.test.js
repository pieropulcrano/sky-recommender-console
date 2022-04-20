import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import VodRecSearchForm from './VodRecSearchForm';
import vodEventFixture from '../../../fixtures/vod-event';
import { initialValues } from './config';

describe('Vod Rec Search Form', () => {
  let props;
  let handleSubmit;
  const selectBtn = 'Select';

  beforeEach(() => {
    handleSubmit = jest.fn();
    props = {
      onSubmit: handleSubmit,
      onSearch: jest.fn(),
      isSearching: false,
      searchResult: [],
      removeToken: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    render(<VodRecSearchForm {...props} />);
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  //integration test of dataGridTable
  it('should display result', () => {
    props.searchResult = vodEventFixture.items;

    render(<VodRecSearchForm {...props} />);
    expect(
      screen.queryByText(vodEventFixture.items[0].title),
    ).toBeInTheDocument();
  });

  describe('Should not submit', () => {
    it('if no value is checked', async () => {
      render(<VodRecSearchForm {...props} />);

      const selectButton = screen.queryByText(selectBtn);
      await waitFor(() => fireEvent.click(selectButton));

      expect(props.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Should submit', () => {
    //integration test of dataGridTable
    it('if a value is checked', async () => {
      props.searchResult = vodEventFixture.items;

      render(<VodRecSearchForm {...props} />);

      const checkbox = screen.queryByRole('checkbox');
      await waitFor(() => fireEvent.click(checkbox));

      const selectButton = screen.queryByText(selectBtn);
      await waitFor(() => fireEvent.click(selectButton));

      expect(props.onSubmit).toHaveBeenCalled();
      expect(props.onSubmit).toHaveBeenCalledWith({
        ...props.searchResult[0].selectedEvent,
        selectedEvent: {
          ...initialValues.selectedEvent,
          ...props.searchResult[0],
        },
        title: '',
      });
    });
  });
});
