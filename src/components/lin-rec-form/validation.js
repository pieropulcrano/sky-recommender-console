import * as Yup from 'yup';

const allSelectedEventsAreCoupleHdSd = (slotsObj) => {
  let decoupledEvents = false;
  for (let key in slotsObj) {
    if (
      (Object.keys(slotsObj[key].hd).length === 0 &&
        Object.keys(slotsObj[key].sd).length !== 0) ||
      (Object.keys(slotsObj[key].hd).length !== 0 &&
        Object.keys(slotsObj[key].sd).length === 0)
    ) {
      decoupledEvents = true;
      break;
    }
  }
  return decoupledEvents;
};

Yup.addMethod(Yup.object, 'allSelectedEventsAreCoupleHdSd', function (list) {
  return this.test({
    name: 'allSelectedEventsAreCoupleHdSd',
    message: 'Each event pair must have one HD event and one SD event',
    exclusive: true,
    params: { keys: list.join(', ') },
    test: (slotsObj) => !allSelectedEventsAreCoupleHdSd(slotsObj),
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
    .min(Yup.ref('startDateTime'), "End date can't be before start date")
    .required(),
  recommendation: Yup.object()
    .shape(slotsShape)
    .allSelectedEventsAreCoupleHdSd(['1', '2', '3', '4', '5'])
    .required(),
});
