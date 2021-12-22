import * as Yup from 'yup';

const objShape = {
  id: Yup.string().required(),
  title: Yup.string().required(),
};

export const DEFAULT_VALUES = {
  recommendation: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
  },
};

export const validationSchema = Yup.object().shape({
  recommendation: Yup.object()
    .shape({
      1: Yup.object().shape(objShape).required(),
      2: Yup.object().shape(objShape).required(),
      3: Yup.object().shape(objShape).required(),
      4: Yup.object().shape(objShape).required(),
      5: Yup.object().shape(objShape).required(),
      6: Yup.object().shape(objShape).required(),
      7: Yup.object().shape(objShape).required(),
      8: Yup.object().shape(objShape).required(),
      9: Yup.object().shape(objShape).required(),
      10: Yup.object().shape(objShape).required(),
    })
    .required(),
});
