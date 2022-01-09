import React from 'react';
import PropTypes from 'prop-types';
import LinRecSearchForm from '../../components/lin-rec-search-form/LinRecSearchForm';
import useNotification from '../../hooks/useNotification';
import { searchVodRec } from '../../providers/vod-rec-provider/VodRecProvider';
import { mapSearchResultForDataTable } from './SearchLinRec.helpers';

const SearchVodRec = ({ addEvent, handleClose, resolution }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const { addAlert } = useNotification();

  const onSearch = React.useCallback(
    async (values) => {
      setSearchResult([]);
      setIsSearching(true);
      try {
        let res = await searchVodRec(values);
        const rows = mapSearchResultForDataTable(res);
        setSearchResult(rows);
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
