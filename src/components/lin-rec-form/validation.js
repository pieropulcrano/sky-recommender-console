import * as Yup from 'yup';
import { isAfter } from 'date-fns';

const eventShape = {
  position: Yup.string().required(),
  title: Yup.string().required(),
};

const slotCoupleWithValidation = Yup.object().shape(
  {
    sd: Yup.object().when('hd', {
      is: (hd) => hd && Object.keys(hd).length === 0,
      then: () => Yup.object().shape(eventShape).required(),
    }),
    hd: Yup.object().when('sd', {
      is: (sd) => sd && Object.keys(sd).length === 0,
      then: () => Yup.object().shape(eventShape).required(),
    }),
  },
  ['sd', 'hd'],
);

const slotCoupleWithoutValidation = Yup.object().shape({
  sd: Yup.object(),
  hd: Yup.object(),
});

const atLeastOneSlotCoupleAtPositionNHaveEventHdOrSdSelected = (
  arraySlotCouples = [],
) => {
  return arraySlotCouples.some((arraySlotCoupleAtPositionN) => {
    const hdSdSlotsAtPositionN = Object.values(arraySlotCoupleAtPositionN);
    return hdSdSlotsAtPositionN.some(
      (slot) => Object.values(slot).length !== 0,
    );
  });
};

const checkEndDateTime = function checkEnd(endDateTime) {
  const { startDateTime } = this.parent;
  const { path, createError } = this;
  try {
    let startDateResetted = startDateTime.setSeconds(0);
    let endDateResetted = endDateTime.setSeconds(0);
    return isAfter(endDateResetted, startDateResetted);
  } catch (error) {
    return createError({ path, message: 'Invalid startDate' });
  }
};

const recommendationShape = Yup.object().shape(
  {
    1: slotCoupleWithValidation,
    2: slotCoupleWithoutValidation.when(['3', '4', '5'], {
      is: (third, fourth, fifth) =>
        atLeastOneSlotCoupleAtPositionNHaveEventHdOrSdSelected([
          third,
          fourth,
          fifth,
        ]),
      then: () => slotCoupleWithValidation,
    }),
    3: slotCoupleWithoutValidation.when(['4', '5'], {
      is: (fourth, fifth) =>
        atLeastOneSlotCoupleAtPositionNHaveEventHdOrSdSelected([fourth, fifth]),
      then: () => slotCoupleWithValidation,
    }),
    4: slotCoupleWithoutValidation.when(['5'], {
      is: (fifth) =>
        atLeastOneSlotCoupleAtPositionNHaveEventHdOrSdSelected([fifth]),
      then: () => slotCoupleWithValidation,
    }),
    5: slotCoupleWithoutValidation,
  },
  ['1', '2', '3', '4', '5'],
);

export const validationSchema = Yup.object().shape({
  cluster: Yup.string().required('Required'),
  startDateTime: Yup.date()
    .typeError('Invalid date')
    .min(new Date(), 'Date cannot be in the past')
    .required(),
  endDateTime: Yup.date()
    .typeError('Invalid date')
    .test(
      'endDateTime',
      'End date should be after initial date',
      checkEndDateTime,
    )
    .required('End date required'),
  recommendation: recommendationShape,
});

export const isEditingValidationSchema = Yup.object().shape({
  cluster: Yup.string().required('Required'),
  startDateTime: Yup.date().typeError('Invalid date').required(),
  endDateTime: Yup.date()
    .typeError('Invalid date')
    .test(
      'endDateTime',
      'End date should be after initial date',
      checkEndDateTime,
    )
    .required('End date required'),
  recommendation: recommendationShape,
});
