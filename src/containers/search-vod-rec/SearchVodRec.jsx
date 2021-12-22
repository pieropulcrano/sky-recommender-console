import React from 'react';
import VodRecSearchForm from '../../components/vod-rec-search-form/VodRecSearchForm';
import useNotification from '../../hooks/useNotification';
import { searchVodRec } from '../../providers/vod-rec-provider/VodRecProvider';
import { formatVodEvent } from '../../utils/vodEvent';

const SearchVodRec = ({ addEvent, handleClose }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const { addAlert } = useNotification();

  const onSearch = async (values) => {
    setSearchResult([]);
    setIsSearching(true);
    try {
      let res = await searchVodRec(values);
      const rows = res.map((event) => formatVodEvent(event));
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
  };

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

export default SearchVodRec;
