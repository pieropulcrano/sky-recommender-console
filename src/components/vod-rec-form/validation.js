import * as Yup from 'yup';

const objShape = {
  id: Yup.string().required(),
  position: Yup.string().required(),
  title: Yup.string().required(),
};

export const DEFAULT_VALUES = {
  cluster: '',
  startDateTime: null,
  recommendation: { 1: null, 2: null, 3: null, 4: null, 5: null },
};

export const validationSchema = Yup.object().shape({
  cluster: Yup.string().required(),
  startDateTime: Yup.date().required(),
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
