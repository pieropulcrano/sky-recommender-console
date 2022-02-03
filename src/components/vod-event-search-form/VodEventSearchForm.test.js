import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import VodEventSearchForm from './VodEventSearchForm';
//import vodRecToSearch from '../../../fixtures/vod-to-search-mock.json';
//import { initialValues } from './config';

describe('Vod Event Search Form', () => {
  let props;
  let handleSubmit;
  const searchBtn = 'Search';
  const titleLbl = 'Title';
  const titleToInsert = "L'isola che non c'è";
  const errorEmpTitle = 'Invalid value';

  beforeEach(() => {
    handleSubmit = jest.fn();
    props = {
      onSubmit: handleSubmit,
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    render(<VodEventSearchForm {...props} />);
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  describe('Should not search', () => {
    it('if title is empty', async () => {
      render(<VodEventSearchForm {...props} />);

      const searchButton = screen.queryByText(searchBtn);
      await waitFor(() => fireEvent.click(searchButton));

      expect(screen.getByText(errorEmpTitle)).toBeInTheDocument();
      expect(props.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Should search', () => {
    it('if title is not empty', async () => {
      render(<VodEventSearchForm {...props} />);

      await waitFor(() =>
        fireEvent.change(screen.queryByLabelText(titleLbl), {
          target: { value: titleToInsert },
        }),
      );

      const searchButton = screen.queryByText(searchBtn);
      await waitFor(() => fireEvent.click(searchButton));

      expect(props.onSubmit).toHaveBeenCalled();
      expect(props.onSubmit).toHaveBeenCalledWith({ title: titleToInsert });
    });
  });
});
