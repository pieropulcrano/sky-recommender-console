import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string().typeError('Invalid value').required('Required'),
  startDateTime: Yup.date().typeError('Invalid date').required('Required'),
});
