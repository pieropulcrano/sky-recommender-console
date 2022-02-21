import React from 'react';
import Spinner from '../../components/spinner/Spinner';
import { updateFallbackVodRec } from '../../providers/vod-rec-provider/VodRecProvider';
import {
  normalizeFallbackVodRec,
  prepareFallbackVodRec,
} from './UpsertFallbackVodRec.helpers';
import useNotification from '../../hooks/useNotification';
import VodRecFallbackForm from '../../components/vod-rec-fallback-form/VodRecFallbackForm';
import useFallbackVodRec from '../../hooks/useFallbackVodRec';

/**
 * Container component that handle the logic to create / edit a fallback vod recommendation.
 */

const UpsertFallbackVodRec = ({ handleAlertFallback }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { data: fallbackVodRec, error: fallbackVodRecError } =
    useFallbackVodRec();

  const { addAlert } = useNotification();

  React.useEffect(() => {
    if (fallbackVodRecError) {
      addAlert({
        text: 'An error occured during the loading of the fallback vod rec.',
        title: 'Vod Fallback loading failed',
        type: 'error',
        id: Date.now(),
      });
    }
  }, [addAlert, fallbackVodRecError]);

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      const data = prepareFallbackVodRec(fallbackVodRec.items[0].id, values);
      await updateFallbackVodRec(data);
      handleAlertFallback({ items: [data] });
      addAlert({
        text: 'Vod Fallback was successfully updated.',
        title: ` Vod Fallback updated`,
        type: 'success',
        data_test: 'vod-fallback-ok-not',
        id: Date.now(),
      });
    } catch (error) {
      addAlert({
        text: 'An error occurred while saving the Vod Fallback recommendation.',
        title: `Vod Fallback saving error`,
        type: 'error',
        id: Date.now(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!fallbackVodRec && !fallbackVodRecError && <Spinner />}
      {(fallbackVodRec || fallbackVodRecError) && (
        <VodRecFallbackForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          initialValues={
            fallbackVodRec
              ? {
                  recommendation: normalizeFallbackVodRec(
                    fallbackVodRec.items[0].recommendation,
                  ),
                }
              : { recommendation: {} }
          }
        />
      )}
    </>
  );
};

export default UpsertFallbackVodRec;
