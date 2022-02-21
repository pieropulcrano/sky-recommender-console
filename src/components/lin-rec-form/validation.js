import * as Yup from 'yup';
import { isAfter } from 'date-fns';

/**
 * The shape of the event that populates the form.
 */
const eventShape = {
  position: Yup.string().required(),
  title: Yup.string().required(),
};

/**
 * Validation rule for a couple of hd / sd event slots.
 * When active, the user must fill at least one between the current HD and the SD slot.
 */
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

/**
 * Validation rule to force user to fill one of the current SD / HD slot, if at least one of next slots is filled.
 */

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

/**
 * Validation rule to check that the end date entered by the user is valid and after the start date.
 */

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

/**
 * The shape of the recommendation that populates the form.
 */

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

/**
 * validation schema passed to the form when in creation mode
 */

export const validationSchema = Yup.object().shape({
  cluster: Yup.string().required('Required'),
  startDateTime: Yup.date()
    .typeError('Invalid date')
    .min(new Date(), 'Date cannot be in the past')
    .required('Required'),
  endDateTime: Yup.date()
    .typeError('Invalid date')
    .min(new Date(), 'Date cannot be in the past')
    .test(
      'endDateTime',
      'End date should be after initial date',
      checkEndDateTime,
    )
    .required('End date required'),
  recommendation: recommendationShape,
});

/**
 * validation schema passed to the form when is in edit mode
 */

export const isEditingPresentRecSchema = Yup.object().shape({
  cluster: Yup.string().required('Required'),
  startDateTime: Yup.date().required('Required'),
  endDateTime: Yup.date()
    .typeError('Invalid date')
    .min(new Date(), 'Date cannot be in the past')
    .test(
      'endDateTime',
      'End date should be after initial date',
      checkEndDateTime,
    )
    .required('End date required'),
  recommendation: recommendationShape,
});
