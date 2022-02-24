import React from 'react';
import PropTypes from 'prop-types';
import {
  createVodRec,
  getPrevVodRec,
  updateVodRec,
  deleteVodRec,
} from '../../providers/vod-rec-provider/VodRecProvider';
import { prepareVodRec, normalizeVodRec } from './UpsertVodRec.helpers';
import Spinner from '../../components/spinner/Spinner';
import VodRecForm from '../../components/vod-rec-form/VodRecForm';
import useVodRec from '../../hooks/useVodRec';
import { formatToISO8601 } from '../../utils/date';
import useNotification from '../../hooks/useNotification';
import getMessageError from '../../utils/errorHandling';

/**
 * Container component that handle the logic to create / edit a vod recommendation.
 */

const UpsertVodRec = ({ id, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [prevVodRecIsLoading, setPrevVodRecIsLoading] = React.useState(false);
  const [prevVodRec, setPrevRecVod] = React.useState([]);

  const { data: vodRec, error: vodRecError } = useVodRec(id);

  const { addAlert } = useNotification();

  let searchedDate = React.useRef();

  React.useEffect(() => {
    if (vodRecError)
      addAlert({
        text: 'An error occured during the loading of the vod rec.',
        title: 'Vod loading failed',
        type: 'error',
        id: Date.now(),
      });
  }, [addAlert, vodRecError]);

  const loadPrevVodRec = React.useCallback(
    async (params) => {
      const { cluster, startDateTime } = params;
      if (!cluster || !startDateTime) return;
      try {
        setPrevVodRecIsLoading(true);
        const res = await getPrevVodRec({
          cluster,
          startDate: formatToISO8601(startDateTime),
        });
        if (Object.keys(res.item).length === 0)
          addAlert({
            text: 'There are no recommendations prior to the date entered.',
            title: 'Previous Vod Not Found',
            type: 'info',
            id: Date.now(),
          });
        searchedDate.current = startDateTime;
        setPrevVodRecIsLoading(false);
        setPrevRecVod(res);
      } catch (error) {
        setPrevVodRecIsLoading(false);
        addAlert({
          text: getMessageError(error),
          title: 'Vod loading failed',
          type: 'warning',
          id: Date.now(),
        });
      }
    },
    [addAlert],
  );

  const onDelete = async (id) => {
    try {
      setIsDeleting(true);
      await deleteVodRec(id);
      addAlert({
        text: 'Vod was successfully deleted.',
        title: ` Vod Deleted`,
        type: 'success',
        id: Date.now(),
      });
      setIsDeleting(false);
      onSuccess();
    } catch (error) {
      setIsDeleting(false);
      addAlert({
        text: getMessageError(error),
        title: `Vod deleting error`,
        type: 'error',
        id: Date.now(),
      });
    }
  };

  const onSubmit = React.useCallback(
    async (values) => {
      setIsSubmitting(true);
      try {
        if (id) {
          const updated = prepareVodRec(id, values);
          await updateVodRec(id, updated);
          addAlert({
            text: 'Vod was successfully updated.',
            title: ` Vod Updated`,
            type: 'success',
            id: Date.now(),
          });
          setIsSubmitting(false);
          onSuccess();
        } else {
          const vodRec = prepareVodRec(null, values);
          await createVodRec(vodRec);
          addAlert({
            text: 'Vod was successfully created.',
            title: ` Vod Created`,
            type: 'success',
            data_test: 'vod-update-ok-not',
            id: Date.now(),
          });
          onSuccess();
        }
      } catch (error) {
        setIsSubmitting(false);
        addAlert({
          text: getMessageError(error),
          title: `Vod saving error`,
          type: 'error',
          id: Date.now(),
        });
      }
    },
    [id, onSuccess, addAlert],
  );

  return (
    <>
      {id && !vodRec && !vodRecError ? (
        <Spinner height="300px" width="700px" />
      ) : (
        !vodRecError && (
          <VodRecForm
            recId={id}
            onSubmit={onSubmit}
            onDelete={onDelete}
            isDeleting={isDeleting}
            isSubmitting={isSubmitting}
            prevVodRecIsLoading={prevVodRecIsLoading}
            loadPrevVodRec={loadPrevVodRec}
            initialValues={
              vodRec
                ? {
                    cluster: vodRec.items[0].cluster,
                    startDateTime: vodRec.items[0].validFrom,
                    recommendation: normalizeVodRec(
                      vodRec.items[0].recommendation,
                    ),
                  }
                : prevVodRec?.item?.recommendation?.length > 0
                ? {
                    cluster: prevVodRec.item.cluster,
                    startDateTime: searchedDate.current,
                    recommendation: normalizeVodRec(
                      prevVodRec.item.recommendation,
                    ),
                  }
                : {}
            }
          />
        )
      )}
    </>
  );
};

UpsertVodRec.defaultProps = {
  id: undefined,
};

UpsertVodRec.propTypes = {
  /**
   * The id of the vod recommendation to retrieve.
   */
  id: PropTypes.string,
  /**
   * The callback function called if the create / edit request was successful-
   */
  onSuccess: PropTypes.func.isRequired,
};

export default UpsertVodRec;
