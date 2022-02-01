import React from 'react';
import PropTypes from 'prop-types';
import LinRecSearchForm from '../../components/lin-rec-search-form/LinRecSearchForm';
import useNotification from '../../hooks/useNotification';
import { searchVodRec } from '../../providers/vod-rec-provider/VodRecProvider';

const SearchVodRec = ({ addEvent, handleClose, resolution }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const { addAlert } = useNotification();

  const onSearch = React.useCallback(
    async (values) => {
      setSearchResult([]);
      setIsSearching(true);
      const toSearch = {
        ...values,
        startProgram_gte: values.startDateTime.toISOString(),
        type: 'LIN',
      };
      if (resolution === 'SD') toSearch.resolution = 'SD';
      try {
        let res = await searchVodRec(toSearch);
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

SearchVodRec.propTypes = {
  addEvent: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  resolution: PropTypes.oneOf(['HD', 'SD']),
};

export default SearchVodRec;
