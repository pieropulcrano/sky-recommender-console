import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import EventSlot from './EventSlot';

describe('Event Slot', () => {
  let props;
  let initialValues;
  let validationSchema;

  beforeEach(() => {
    props = {
      name: 'eventSlot',
      handleOpen: jest.fn(),
      options: {
        opt_1: 'opt-1',
        opt_2: 'opt-2',
      },
    };
    initialValues = { eventSlot: {} };
    validationSchema = Yup.object().shape({
      eventSlot: Yup.object().shape({
        id: Yup.string().required(),
        position: Yup.string().required(),
        title: Yup.string().required(),
      }),
    });
  });

  describe('empty', () => {
    it('should render', () => {
      render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      expect(document.body.childNodes[0].children).toMatchSnapshot();
    });

    it('should render a disabled slot', () => {
      props.disabled = true;
      render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      expect(document.body.childNodes[0].children).toMatchSnapshot();
    });

    it('should render an hd slot', () => {
      props.type = 'hd';
      render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      expect(document.body.childNodes[0].children).toMatchSnapshot();
    });

    it('should render an sd slot', () => {
      props.type = 'sd';
      render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      expect(document.body.childNodes[0].children).toMatchSnapshot();
    });

    it('should render an hd disabled slot', () => {
      props.type = 'hd';
      props.disabled = true;
      render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      expect(document.body.childNodes[0].children).toMatchSnapshot();
    });

    it('should call handleOpen callback', async () => {
      const { container } = render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      const addButton = container.querySelector('button');
      await fireEvent.click(addButton);

      expect(props.handleOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe('not empty', () => {
    beforeEach(() => {
      initialValues = {
        eventSlot: {
          title: 'event-title',
          startProgram: '2021-12-24T12:00:00Z',
          endProgram: '2022-12-24T12:00:00Z',
          warningMessage: 'out of date',
        },
      };
    });

    it('should render', () => {
      render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      expect(document.body.childNodes[0].children).toMatchSnapshot();
    });

    it('should render a disabled slot', () => {
      props.disabled = true;

      render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      expect(document.body.childNodes[0].children).toMatchSnapshot();
    });

    it('should render an hd slot', () => {
      props.type = 'hd';

      render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      expect(document.body.childNodes[0].children).toMatchSnapshot();
    });

    it('should remove the assigned event', async () => {
      const { container } = render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      const removeButton = container.querySelector('button');
      await waitFor(() => fireEvent.click(removeButton));

      expect(document.body.childNodes[0].children).toMatchSnapshot();
    });

    it('should display the warning tooltip', async () => {
      render(
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <EventSlot {...props} />
        </Formik>,
      );

      let warningIcon = screen.getByTitle('out of date');
      await userEvent.hover(warningIcon);
      const tooltipText = await screen.findByText('out of date');

      expect(tooltipText).toBeInTheDocument();
    });
  });
});
