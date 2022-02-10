import React from 'react';
import PropTypes from 'prop-types';
import {
  createLinRec,
  updateLinRec,
  deleteLinRec,
} from '../../providers/lin-rec-provider/LinRecProvider';
import { prepareLinRec, normalizeLinRec } from './UpsertLinRec.helpers';
import Spinner from '../../components/spinner/Spinner';
import LinRecForm from '../../components/lin-rec-form/LinRecForm';
import useLinRec from '../../hooks/useLinRec';
import useNotification from '../../hooks/useNotification';

const UpsertLinRec = ({ id, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { data: linRec, error: linRecError } = useLinRec(id);

  const { addAlert } = useNotification();

  React.useEffect(() => {
    if (linRecError) {
      addAlert({
        text: 'An error occured during the loading of the lin rec.',
        title: 'Lin loading failed',
        type: 'error',
        id: Date.now(),
      });
    }
  }, [addAlert, linRecError]);

  const onDelete = async (id) => {
    try {
      setIsDeleting(true);
      await deleteLinRec(id);
      onSuccess();
      addAlert({
        text: 'Lin was successfully deleted.',
        title: ` Lin Deleted`,
        type: 'success',
        id: Date.now(),
      });
    } catch {
      addAlert({
        text: 'An error occurred while deleting the Lin recommendation.',
        title: `Lin deleting error`,
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
          const updated = prepareLinRec(id, values);
          await updateLinRec(id, updated);
          onSuccess();
          addAlert({
            text: 'Lin was successfully updated.',
            title: ` Lin Updated`,
            type: 'success',
            id: Date.now(),
          });
        } else {
          const linRec = prepareLinRec(null, values);
          await createLinRec(linRec);
          onSuccess();
          addAlert({
            text: 'Lin was successfully created.',
            title: 'Lin Created',
            type: 'success',
            id: Date.now(),
          });
        }
      } catch (error) {
        addAlert({
          text: 'An error occurred while saving the Lin recommendation.',
          title: 'Lin saving error',
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
      {id && !linRec && !linRecError ? (
        <Spinner height="300px" width="700px" />
      ) : (
        !linRecError && (
          <LinRecForm
            recId={id}
            onSubmit={onSubmit}
            onDelete={onDelete}
            isDeleting={isDeleting}
            isSubmitting={isSubmitting}
            initialValues={
              linRec
                ? {
                    cluster: linRec[0].cluster,
                    startDateTime: linRec[0].validFrom,
                    endDateTime: linRec[0].validTo,
                    recommendation: normalizeLinRec(linRec[0].recommendation),
                  }
                : {}
            }
          />
        )
      )}
    </>
  );
};

UpsertLinRec.defaultProps = {
  id: undefined,
};

UpsertLinRec.propTypes = {
  id: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
};

export default UpsertLinRec;
