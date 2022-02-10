import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', () => {
  const initialValues = {
    textInput: '',
  };

  const validationSchema = {
    title: Yup.string().typeError('Invalid value').required('Required'),
  };

  const props = {
    name: 'textInput',
  };

  it('should render', () => {
    render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <TextInput {...props} />
      </Formik>,
    );

    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });
});
