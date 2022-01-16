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
import useNotification from '../../hooks/useNotification';

const UpsertVodRec = ({ id, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [prevVodRecIsLoading, setPrevVodRecIsLoading] = React.useState(false);
  const [prevVodRec, setPrevRecVod] = React.useState([]);

  const { data: vodRec, error: vodRecError } = useVodRec(id);

  const { addAlert } = useNotification();

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
          type:'VOD',
          validFrom_lte: startDateTime,
        });
        if (res.length === 0)
          addAlert({
            text: 'There are no recommendations prior to the date entered.',
            title: 'Previous Vod Not Found',
            type: 'info',
            id: Date.now(),
          });

        setPrevRecVod(res);
      } catch (error) {
        addAlert({
          text: 'An error occured during the loading of the previous vod rec.',
          title: 'Vod loading failed',
          type: 'warning',
          id: Date.now(),
        });
      } finally {
        setPrevVodRecIsLoading(false);
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
      onSuccess();
    } catch {
      addAlert({
        text: 'An error occurred while deleting the Vod recommendation.',
        title: `Vod deleting error`,
        type: 'error',
        id: Date.now(),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = React.useCallback(
    async (values) => {
      setIsSubmitting(true);
      try {
        if (id) {
          const updated = prepareVodRec(id, values);
          await updateVodRec(id, updated);
          onSuccess();
          addAlert({
            text: 'Vod was successfully updated.',
            title: ` Vod Updated`,
            type: 'success',
            id: Date.now(),
          });
        } else {
          const vodRec = prepareVodRec(null, values);
          await createVodRec(vodRec);
          onSuccess();
          addAlert({
            text: 'Vod was successfully created.',
            title: ` Vod Created`,
            type: 'success',
            data_test:"vod-update-ok-not",
            id: Date.now(),
          });
        }
      } catch (error) {
        addAlert({
          text: 'An error occurred while saving the Vod recommendation.',
          title: `Vod saving error`,
          type: 'error',
          id: Date.now(),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, onSuccess, addAlert],
  );

  return (
    <>
      {id && !vodRec && !vodRecError ? (
        <Spinner height="300px" width="700px" />
      ) : (
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
                  cluster: vodRec[0].cluster,
                  startDateTime: vodRec[0].validFrom,
                  recommendation: normalizeVodRec(vodRec[0].recommendation),
                }
              : prevVodRec.length > 0
              ? {
                  cluster: prevVodRec[0].cluster,
                  startDateTime: prevVodRec[0].validFrom,
                  recommendation: normalizeVodRec(prevVodRec[0].recommendation),
                }
              : {}
          }
        />
      )}
    </>
  );
};

UpsertVodRec.defaultProps = {
  id: undefined,
};

UpsertVodRec.propTypes = {
  id: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
};

export default UpsertVodRec;
