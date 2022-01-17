import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import UpsertVodRec from '../../containers/upsert-vod-rec/UpsertVodRec';
import RecTooltipInfo from './rec-tooltip-info/RecTooltipInfo';
import useNotification from '../../hooks/useNotification';
import Spinner from '../spinner/Spinner';
import Modal from '../../components/modal/Modal';
import UpsertLinRec from '../../containers/upsert-lin-rec/UpsertLinRec';
import { Hidden } from './Scheduler.styled';
import { resources, recTypes } from './config';
import { mapForScheduler } from './Scheduler.helpers';
import { getRec } from '../../providers/rec-provider/RecProvider';
import './style.css';

const Scheduler = () => {
  // isloading is handled here in order to avoid infinite loop
  // https://github.com/fullcalendar/fullcalendar-react/issues/97
  const [recIsLoading, setRecIsLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedRec, setSelectedRec] = React.useState(undefined);
  const [recType, setRecType] = React.useState(undefined);

  const { addAlert } = useNotification();

  const CalendarRef = React.useRef();

  const modalTitle = `${isEditing ? `EDIT ${recType}` : `NEW ${recType}`}`;

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    if (isEditing) {
      setIsEditing(false);
      setSelectedRec(false);
    }
  };

  const loadRec = React.useCallback(
    async (info, success, error) => {
      try {
        const res = await getRec({
          validFrom_gte: info.startStr,
          validTo_lte: info.endStr,
        });
        const data = mapForScheduler(res);
        success(data);
      } catch (err) {
        addAlert({
          text: 'An error occured during the loading of the scheduled recommendations.',
          title: 'Recommendations loading failed',
          type: 'error',
          id: Date.now(),
        });
        error(err);
      }
    },
    [addAlert],
  );

  const handleRecLoading = (isLoading) => setRecIsLoading(isLoading);

  const handleRecEdit = (eventInfo) => {
    setIsEditing(true);
    setRecType(eventInfo.event.extendedProps.extraProps.type);
    setSelectedRec(eventInfo.event);
    handleOpenModal();
  };

  const handleRecCreate = (type) => {
    setRecType(type);
    handleOpenModal();
  };

  const handleCRUDSuccess = () => {
    handleCloseModal();
    CalendarRef.current.getApi().refetchEvents();
  };

  const renderRecContent = (arg) => {
    return (
      <RecTooltipInfo
        data-test-tooltip-id={arg.event.extendedProps.extraProps.id}
        title={arg.event.title}
        recommendation={arg.event.extendedProps.extraProps.recommendation}
        startDateTime={arg.event.start}
        endDateTime={arg.event.end}
      />
    );
  };

  const renderEvent = (data) => {
    data.el.setAttribute(
      'data-testId',
      'eventId-' + data.event.extendedProps.extraProps.id,
    );
  };

  return (
    <>
      {recIsLoading && <Spinner height="65vh" />}
      <Hidden isLoading={recIsLoading}>
        <FullCalendar
          ref={CalendarRef}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[resourceTimelinePlugin]}
          initialView="resourceTimelineMonth"
          height="700px"
          resourceAreaWidth="180px"
          resourceAreaHeaderContent="Clusters"
          resources={resources}
          headerToolbar={{
            left: `prev,next,today,resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth`,
            center: 'title',
            right: 'newVod newLin',
          }}
          customButtons={{
            newVod: {
              text: 'NEW VOD',
              click: () => handleRecCreate(recTypes.vod),
            },
            newLin: {
              text: 'NEW LIN',
              click: () => handleRecCreate(recTypes.lin),
            },
          }}
          nowIndicator
          eventContent={renderRecContent}
          expandRows
          eventDidMount={renderEvent}
          events={loadRec}
          eventClick={handleRecEdit}
          loading={handleRecLoading}
        />
        <Modal
          title={modalTitle}
          open={openModal}
          handleClose={handleCloseModal}
        >
          {!isEditing && recType === recTypes.vod && (
            <UpsertVodRec onSuccess={handleCRUDSuccess} />
          )}
          {!isEditing && recType === recTypes.lin && (
            <UpsertLinRec onSuccess={handleCRUDSuccess} />
          )}
          {isEditing && recType === recTypes.vod && selectedRec?.id && (
            <UpsertVodRec id={selectedRec?.id} onSuccess={handleCRUDSuccess} />
          )}
          {isEditing && recType === recTypes.lin && selectedRec?.id && (
            <UpsertLinRec id={selectedRec?.id} onSuccess={handleCRUDSuccess} />
          )}
        </Modal>
      </Hidden>
    </>
  );
};

export default Scheduler;
