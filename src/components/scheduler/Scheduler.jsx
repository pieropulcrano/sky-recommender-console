import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import UpsertVodRec from '../../containers/upsert-vod-rec/UpsertVodRec';
import RecTooltipInfo from './rec-tooltip-info/RecTooltipInfo';
import useNotification from '../../hooks/useNotification';
import Spinner from '../spinner/Spinner';
import UpsertLinRec from '../../containers/upsert-lin-rec/UpsertLinRec';
import { Hidden, StyleWrapper } from './Scheduler.styled';
import {
  resources,
  recTypes,
  translateRecTypes,
  resourceAreaColumns,
} from './config';
import { prepareForScheduler } from './Scheduler.helpers';
import { getRec } from '../../providers/rec-provider/RecProvider';
import { formatToISO8601 } from '../../utils/date';
import useToken from '../../hooks/useToken';

/**
 * Component to handle the scheduling of the recommendations.
 */

const Scheduler = () => {
  /**
   * isloading is handled here in order to avoid infinite loop
   * @see https://github.com/fullcalendar/fullcalendar-react/issues/97
   * */

  const [recIsLoading, setRecIsLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedRec, setSelectedRec] = React.useState(undefined);
  const [recType, setRecType] = React.useState(undefined);

  const { token } = useToken();
  const { addAlert } = useNotification();

  const CalendarRef = React.useRef();

  const modalTitle = `${
    isEditing
      ? `Edit ${translateRecTypes[recType]} Recommendation`
      : `Create New ${translateRecTypes[recType]} Recommendation`
  }`;

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
        const res = await getRec(
          {
            validFrom: formatToISO8601(info.startStr),
            validTo: formatToISO8601(info.endStr),
          },
          token,
        );
        const data = prepareForScheduler(res);
        success(data);
      } catch (err) {
        addAlert({
          text: err.message,
          title: 'Recommendations loading failed',
          type: 'error',
          id: Date.now(),
        });
        error();
      }
    },
    [addAlert, token],
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
        startDateTime={arg.event.extendedProps.extraProps.validFrom}
        endDateTime={arg.event.extendedProps.extraProps.validTo}
      />
    );
  };

  const renderEvent = (data) => {
    data.el.setAttribute(
      'data-testId',
      'eventId-' + data.event.extendedProps.extraProps.id,
    );
  };

  const createCustomView = (currentDate) => {
    // Generate a new date for manipulating in the next step
    var startDate = new Date(currentDate.valueOf());
    var endDate = new Date(currentDate.valueOf());

    // Adjust the start & end dates, respectively
    startDate.setDate(startDate.getDate() - 7); // 7 day in the past
    endDate.setDate(endDate.getDate() + 21); // 21 days into the future

    return { start: startDate, end: endDate };
  };

  return (
    <>
      {recIsLoading && <Spinner height="65vh" />}
      <Hidden isLoading={recIsLoading}>
        <StyleWrapper>
          <FullCalendar
            ref={CalendarRef}
            schedulerLicenseKey={process.env.REACT_APP_SCHEDULER_LICENSE_KEY}
            plugins={[resourceTimelinePlugin]}
            initialView="month"
            height="700px"
            resourceAreaWidth="180px"
            resources={resources}
            resourceAreaColumns={resourceAreaColumns}
            headerToolbar={{
              left: `resourceTimelineDay,resourceTimelineWeek,month`,
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
            views={{
              month: {
                type: 'resourceTimeline',
                visibleRange: createCustomView,
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
        </StyleWrapper>
        {!isEditing && recType === recTypes.vod && (
          <UpsertVodRec
            onSuccess={handleCRUDSuccess}
            modalTitle={modalTitle}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
          />
        )}
        {isEditing && recType === recTypes.vod && selectedRec?.id && (
          <UpsertVodRec
            id={selectedRec?.id}
            onSuccess={handleCRUDSuccess}
            modalTitle={modalTitle}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
          />
        )}
        {!isEditing && recType === recTypes.lin && (
          <UpsertLinRec
            onSuccess={handleCRUDSuccess}
            modalTitle={modalTitle}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
          />
        )}
        {isEditing && recType === recTypes.lin && selectedRec?.id && (
          <UpsertLinRec
            id={selectedRec?.id}
            onSuccess={handleCRUDSuccess}
            modalTitle={modalTitle}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Hidden>
    </>
  );
};

export default Scheduler;
