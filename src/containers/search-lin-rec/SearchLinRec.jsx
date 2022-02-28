import React from 'react';
import PropTypes from 'prop-types';
import LinRecSearchForm from '../../components/lin-rec-search-form/LinRecSearchForm';
import useNotification from '../../hooks/useNotification';
import { formatToISO8601 } from '../../utils/date';
import { searchEvent } from '../../providers/event-provider/EventProvider';
import getMessageError from '../../utils/errorHandling';

/**
 * Container component that handle the logic to search a linear event.
 */

const SearchLinRec = ({ addEvent, handleClose, resolution }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const { addAlert } = useNotification();

  const onSearch = React.useCallback(
    async (values) => {
      setSearchResult([]);
      setIsSearching(true);
      const toSearch = {
        title: values.title,
        type: 'LIN',
        startDate: formatToISO8601(values.startDateTime),
      };
      if (resolution === 'SD') toSearch.resolution = 'SD';
      try {
        let res = await searchEvent(toSearch);
        setSearchResult(res);
      } catch (error) {
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
    [resolution, addAlert],
  );

  const onSubmit = (event) => {
    addEvent(event.selectedEvent);
    handleClose();
  };

  return (
    <LinRecSearchForm
      onSearch={onSearch}
      onSubmit={onSubmit}
      isSearching={isSearching}
      searchResult={searchResult}
      resolution={resolution}
    />
  );
};

SearchLinRec.propTypes = {
  /**
   *  Callback function to associate an event to one of the slots of the form for the linear recommendation.
   */
  addEvent: PropTypes.func.isRequired,
  /**
   *  Callback function to close the modal that contains the form.
   */
  handleClose: PropTypes.func.isRequired,
  /**
   *  Resolution of the event to search.
   */
  resolution: PropTypes.oneOf(['HD', 'SD']),
};

export default SearchLinRec;
