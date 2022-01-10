import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string(),
  selectedEvent: Yup.object().required(),
  startDateTime: Yup.date().typeError('Invalid date'),
});
