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
import getMessageError from '../../utils/errorHandling';

/**
 * Container component that handle the logic to create / edit a linear recommendation.
 */

const UpsertLinRec = ({
  id,
  onSuccess,
  modalTitle,
  openModal,
  handleCloseModal,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

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

  const handleOpenModalConfirm = () => {
    setConfirmOpen(true);
  };

  const handleCloseModalConfirm = React.useCallback(() => {
    handleCloseModal();
  }, [handleCloseModal]);

  const onDelete = async (id) => {
    try {
      setIsDeleting(true);
      await deleteLinRec(id);
      addAlert({
        text: 'Lin was successfully deleted.',
        title: ` Lin Deleted`,
        type: 'success',
        id: Date.now(),
      });
      setIsDeleting(false);
      onSuccess();
    } catch (error) {
      addAlert({
        text: getMessageError(error),
        title: `Lin deleting error`,
        type: 'error',
        id: Date.now(),
      });
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
          addAlert({
            text: 'Lin was successfully updated.',
            title: ` Lin Updated`,
            type: 'success',
            id: Date.now(),
          });
          setIsSubmitting(false);
          onSuccess();
        } else {
          const linRec = prepareLinRec(null, values);
          await createLinRec(linRec);
          addAlert({
            text: 'Lin was successfully created.',
            title: 'Lin Created',
            type: 'success',
            id: Date.now(),
          });
          setIsSubmitting(false);
          onSuccess();
        }
      } catch (error) {
        addAlert({
          text: getMessageError(error),
          title: 'Lin saving error',
          type: 'error',
          id: Date.now(),
        });
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
            modalTitle={modalTitle}
            openModal={openModal}
            handleOpenModalConfirm={handleOpenModalConfirm}
            handleCloseModal={handleCloseModalConfirm}
            confirmOpen={confirmOpen}
            setConfirmOpen={setConfirmOpen}
            initialValues={
              linRec
                ? {
                    cluster: linRec.items[0].cluster,
                    startDateTime: linRec.items[0].validFrom,
                    endDateTime: linRec.items[0].validTo,
                    recommendation: normalizeLinRec(
                      linRec.items[0].recommendation,
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

UpsertLinRec.defaultProps = {
  id: undefined,
};

UpsertLinRec.propTypes = {
  /**
   * The id of the linear recommendation to retrieve.
   */
  id: PropTypes.string,
  /**
   * The callback function called if the create / edit request was successful-
   */
  onSuccess: PropTypes.func.isRequired,
  /**
   * The Title of the modal.
   */
  modalTitle: PropTypes.string.isRequired,
  /**
   * The callback function called for open the modal
   */
  openModal: PropTypes.bool,
  /**
   * The callback function called for Close the modal
   */
  handleCloseModal: PropTypes.func.isRequired,
};

export default UpsertLinRec;
