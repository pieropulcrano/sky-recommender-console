import React from 'react';
import {
  createVodRec,
  updateVodRec,
} from '../../providers/vod-rec-provider/VodRecProvider';
import { prepareVodRec, normalizeVodRec } from '../../utils/vodRec';
import Spinner from '../../components/spinner/Spinner';
import VodRecForm from '../../components/vod-rec-form/VodRecForm';
import useLastVodRec from '../../hooks/useLastVodRec';
import useVodRec from '../../hooks/useVodRec';
import useNotification from '../../hooks/useNotification';

const UpsertVodRec = ({ id }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { data: vodRec, error: vodRecError } = useVodRec(id);

  const { data: lastVodRec, error: lastVodRecError } = useLastVodRec(id);

  const { addAlert } = useNotification();

  React.useEffect(() => {
    if (lastVodRecError || vodRecError)
      addAlert({
        text: 'An error occured during the loading of the vod rec.',
        title: 'Vod loading failed',
        type: 'error',
        id: Date.now(),
      });
  }, [lastVodRecError, vodRecError]);

  const onSubmit = React.useCallback(
    async (values) => {
      setIsSubmitting(true);
      try {
        if (id) {
          updateVodRec(id);
        } else {
          const vodRec = prepareVodRec(values);
          await createVodRec(vodRec);
          addAlert({
            text: 'Vod was successfully created.',
            title: ` Vod Created`,
            type: 'success',
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
    [id, addAlert],
  );

  return (
    <>
      {((!lastVodRec && !lastVodRecError) || vodRec) && (
        <Spinner height="300px" width="700px" />
      )}
      {(vodRec || lastVodRec || lastVodRecError) && (
        <VodRecForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          initialValues={
            vodRec
              ? {
                  cluster: vodRec.cluster,
                  startDateTime: vodRec.validFrom,
                  recommendation: vodRec.recommendation,
                }
              : {
                  recommendation: lastVodRecError
                    ? []
                    : normalizeVodRec(lastVodRec[0].recommendation),
                }
          }
        />
      )}
    </>
  );
};

export default UpsertVodRec;
