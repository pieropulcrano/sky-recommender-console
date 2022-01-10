import * as Yup from 'yup';
import { isAfter } from 'date-fns';

const allSelectedEventsAreCoupleHdSd = (slotsObj) => {
  let coupled = true;
  for (let key in slotsObj) {
    if (
      (Object.keys(slotsObj[key].hd).length === 0 &&
        Object.keys(slotsObj[key].sd).length !== 0) ||
      (Object.keys(slotsObj[key].hd).length !== 0 &&
        Object.keys(slotsObj[key].sd).length === 0)
    ) {
      coupled = false;
      break;
    }
  }
  return coupled;
};

Yup.addMethod(Yup.object, 'allSelectedEventsAreCoupleHdSd', function () {
  return this.test({
    name: 'allSelectedEventsAreCoupleHdSd',
    message: 'Each event pair must have one HD event and one SD event',
    exclusive: true,
    test: (slotsObj) => allSelectedEventsAreCoupleHdSd(slotsObj),
  });
});

const eventShape = {
  id: Yup.string().required(),
  position: Yup.string().required(),
  title: Yup.string().required(),
};

const slotShape = {
  sd: Yup.object(eventShape).required(),
  hd: Yup.object(eventShape).required(),
};

const emptySlotShape = {
  sd: Yup.object().required(),
  hd: Yup.object().required(),
};

const slotsShape = {
  1: Yup.object().shape(slotShape).required(),
  2: Yup.object().shape(emptySlotShape).required(),
  3: Yup.object().shape(emptySlotShape).required(),
  4: Yup.object().shape(emptySlotShape).required(),
  5: Yup.object().shape(emptySlotShape).required(),
};

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
      function checkEnd(endDateTime) {
        const { startDateTime } = this.parent;
        let startDateResetted = startDateTime.setSeconds(0);
        let endDateResetted = endDateTime.setSeconds(0);
        return isAfter(endDateResetted, startDateResetted);
      },
    )
    .required('End date required'),
  recommendation: Yup.object()
    .shape(slotsShape)
    .allSelectedEventsAreCoupleHdSd(['1', '2', '3', '4', '5'])
    .required(),
});
