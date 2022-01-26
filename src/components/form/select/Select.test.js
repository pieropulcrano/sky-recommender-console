import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
  let props;
  let initialValues;
  let validationSchema;

  beforeEach(() => {
    props = {
      name: 'select',
      label: 'Select',
      options: {
        opt_1: 'opt-1',
        opt_2: 'opt-2',
      },
    };
    props['data-testid'] = 'select-id';
    initialValues = { select: '' };
    validationSchema = Yup.object().shape({
      select: Yup.string().required('Required'),
    });
  });

  it('should render', () => {
    render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <Select {...props} />
      </Formik>,
    );

    const select = screen.getByTestId(props['data-testid']);

    expect(select).toMatchSnapshot();
  });

  it('should render with given options as selectable items', async () => {
    render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <Select {...props} />
      </Formik>,
    );

    const select = screen.getByRole('button');
    await fireEvent.mouseDown(select);

    expect(screen.getAllByRole('option').length).toBe(2);
    expect(document.body.childNodes).toMatchSnapshot();
  });

  it('should allow user to pick an option', async () => {
    render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <Select {...props} />
      </Formik>,
    );

    const select = screen.getByRole('button');
    await fireEvent.mouseDown(select);

    userEvent.selectOptions(
      screen.getByRole('listbox'),
      screen.getByRole('option', { name: 'opt-1' }),
    );

    await waitFor(() =>
      expect(screen.getByText('opt-1').children).toBeDefined(),
    );
  });

  it('should display validation errors', async () => {
    const { container } = render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <Select {...props} />
      </Formik>,
    );

    const select = screen.getByRole('button');
    await fireEvent.blur(select);

    expect(await screen.findByText(/Required/)).not.toBeNull();
    expect(container.querySelector('p')).toHaveClass('Mui-error');
    expect(screen.getByTestId(props['data-testid'])).toMatchSnapshot();
  });
});
