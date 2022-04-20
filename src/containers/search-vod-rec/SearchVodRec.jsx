import React from 'react';
import PropTypes from 'prop-types';
import VodRecSearchForm from '../../components/vod-rec-search-form/VodRecSearchForm';
import useToken from '../../hooks/useToken';
import useNotification from '../../hooks/useNotification';
import { searchEvent } from '../../providers/event-provider/EventProvider';
import getMessageError from '../../utils/errorHandling';
import { formatToISO8601 } from '../../utils/date';

/**
 * Container component that handle the logic to search a vod event.
 */

const SearchVodRec = ({ addEvent, handleClose, startDate, removeToken }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const { token } = useToken();
  const { addAlert } = useNotification();

  const onSearch = React.useCallback(
    async (values) => {
      setSearchResult([]);
      setIsSearching(true);
      try {
        let payload = { ...values, type: 'VOD' };
        if (startDate) {
          payload.startDate = startDate;
        } else {
          payload.startDate = formatToISO8601(
            new Date(new Date().setDate(new Date().getDate() + 7)),
          );
        }
        let res = await searchEvent(payload, token);
        setSearchResult(res);
      } catch (error) {
        if (error?.response?.status === 401) {
          removeToken();
        }
        addAlert({
          title: 'Vod search error',
          text: getMessageError(error),
          type: 'error',
          id: Date.now(),
        });
      } finally {
        setIsSearching(false);
      }
    },
    [addAlert, startDate],
  );

  const onSubmit = (event) => {
    addEvent(event.selectedEvent);
    handleClose();
  };

  return (
    <VodRecSearchForm
      onSearch={onSearch}
      onSubmit={onSubmit}
      isSearching={isSearching}
      searchResult={searchResult}
    />
  );
};

SearchVodRec.propTypes = {
  /**
   *  Callback function to associate an event to one of the slots of the form for the vod recommendation.
   */
  addEvent: PropTypes.func.isRequired,
  /**
   *  Callback function to close the modal that contains the form.
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Perform logout
   */
  removeToken: PropTypes.func.isRequired,
};

export default SearchVodRec;
