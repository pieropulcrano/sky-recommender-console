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
import useToken from '../../hooks/useToken';
import getMessageError from '../../utils/errorHandling';

/**
 * Container component that handle the logic to create / edit a fallback vod recommendation.
 */

const UpsertFallbackVodRec = ({ handleAlertFallback, removeToken }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { token } = useToken();
  const { data: fallbackVodRec, error: fallbackVodRecError } =
    useFallbackVodRec(token);

  const { addAlert } = useNotification();

  React.useEffect(() => {
    if (fallbackVodRecError) {
      if (fallbackVodRecError?.response?.status === 401) {
        removeToken();
        addAlert({
          text: 'Session Expired',
          title: 'Vod Fallback loading failed',
          type: 'error',
          id: Date.now(),
        });
      } else {
        addAlert({
          text: 'An error occured during the loading of the fallback vod rec.',
          title: 'Vod Fallback loading failed',
          type: 'error',
          id: Date.now(),
        });
      }
    }
  }, [addAlert, fallbackVodRecError]);

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      const data = prepareFallbackVodRec(fallbackVodRec.items[0].id, values);
      await updateFallbackVodRec(data, token);
      handleAlertFallback({ items: [data] });
      setIsSubmitting(false);
      addAlert({
        text: 'Vod Fallback was successfully updated.',
        title: ` Vod Fallback updated`,
        type: 'success',
        data_test: 'vod-fallback-ok-not',
        id: Date.now(),
      });
    } catch (error) {
      if (error?.response?.status === 401) {
        removeToken();
        addAlert({
          text: 'Session Expired',
          title: 'Vod Fallback saving error',
          type: 'error',
          id: Date.now(),
        });
      } else {
        addAlert({
          text: getMessageError(error),
          title: `Vod Fallback saving error`,
          type: 'error',
          id: Date.now(),
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!fallbackVodRec && !fallbackVodRecError && <Spinner />}
      {(fallbackVodRec || fallbackVodRecError) && (
        <VodRecFallbackForm
          removeToken={removeToken}
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
