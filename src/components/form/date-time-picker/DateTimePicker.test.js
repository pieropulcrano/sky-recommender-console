import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import userEvent from '@testing-library/user-event';
import DateTimePicker from './DateTimePicker';

describe('DateTimePicker', () => {
  let props;
  let initialValues;
  let validationSchema;

  beforeEach(() => {
    // add window.matchMedia
    // this is necessary for the date picker to be rendered in desktop mode.
    // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query) => ({
        media: query,
        // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
        matches: query === '(pointer: fine)',
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });

    props = {
      name: 'dateTime',
      label: 'Date Time',
      value: '2021-12-14T15:00:00Z',
      data_test: 'datetime-id',
    };

    initialValues = {};

    validationSchema = Yup.object().shape({
      dateTime: Yup.date().required('Required'),
    });
  });

  afterEach(() => {
    delete window.matchMedia;
  });

  it('should render', () => {
    render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker {...props} />
        </LocalizationProvider>
      </Formik>,
    );

    expect(document.body.children).toMatchSnapshot();
  });

  it('should allow user to type a date', async () => {
    const { container } = render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker {...props} />
        </LocalizationProvider>
      </Formik>,
    );

    const dateInput = await container.querySelector('input');
    userEvent.clear(dateInput);
    await userEvent.type(dateInput, '20/10/2021 6:00 PM', { delay: 1 });

    expect(dateInput).toHaveValue('20/10/2021 6:00 PM');
  });

  it('should allow user to pick a date', async () => {
    const { container } = render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker {...props} />
        </LocalizationProvider>
      </Formik>,
    );

    const calendarIconButton = screen.getByLabelText(/Choose date/);
    await fireEvent.click(calendarIconButton);

    const dayButton = screen.getByText('15');
    await waitFor(() => fireEvent.click(dayButton));

    const amButton = screen.getByText('AM');
    await waitFor(() => fireEvent.click(amButton));

    /**
    *  userEvent.selectOptions(
      screen.getByRole('listbox'),
      screen.getByLabelText('1 hours'),
    );
    */

    // const dateInput = await container.querySelector('input');

    // expect(dateInput).toHaveValue('15/12/2021 13:00 AM');
  });

  it('should display validation error', async () => {
    const { container } = render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker {...props} />
        </LocalizationProvider>
      </Formik>,
    );

    const dateInput = await container.querySelector('input');
    await waitFor(() => fireEvent.blur(dateInput));

    expect(container.querySelector('p')).toHaveClass('Mui-error');
    expect(document.body.children).toMatchSnapshot();
  });
});
