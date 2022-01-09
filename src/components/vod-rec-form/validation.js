import * as Yup from 'yup';

const objShape = {
  id: Yup.string().required(),
  position: Yup.string().required(),
  title: Yup.string().required(),
};

export const DEFAULT_VALUES = {
  cluster: '',
  startDateTime: null,
  recommendation: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
};

export const validationSchema = Yup.object().shape({
  cluster: Yup.string().required('Required'),
  startDateTime: Yup.date().typeError('Invalid date').required(),
  recommendation: Yup.object()
    .shape({
      1: Yup.object().shape(objShape).required(),
      2: Yup.object().shape(objShape).required(),
      3: Yup.object().shape(objShape).required(),
      4: Yup.object().shape(objShape).required(),
      5: Yup.object().shape(objShape).required(),
    })
    .required(),
});
