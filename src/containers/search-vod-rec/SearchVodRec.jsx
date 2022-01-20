import React from 'react';
import PropTypes from 'prop-types';
import VodRecSearchForm from '../../components/vod-rec-search-form/VodRecSearchForm';
import useNotification from '../../hooks/useNotification';
import { searchVodRec } from '../../providers/vod-rec-provider/VodRecProvider';

const SearchVodRec = ({ addEvent, handleClose }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const { addAlert } = useNotification();

  const onSearch = React.useCallback(
    async (values) => {
      setSearchResult([]);
      setIsSearching(true);
      try {
        let res = await searchVodRec({ ...values, type: 'VOD' });
        setSearchResult(res);
      } catch (error) {
        addAlert({
          title: 'Vod search error',
          text: 'An error occured during the search process.',
          type: 'error',
          id: Date.now(),
        });
      } finally {
        setIsSearching(false);
      }
    },
    [addAlert],
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
  addEvent: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SearchVodRec;
