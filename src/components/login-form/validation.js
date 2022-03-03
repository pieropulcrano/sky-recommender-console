import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  user_name: Yup.string().typeError('Invalid value').required('Required'),
  password: Yup.string().typeError('Invalid value').required('Required'),
});
