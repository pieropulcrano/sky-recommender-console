import React from 'react';
import Container from '@mui/material/Container';
import Marginer from '../../components/marginer/Marginer';
import UpsertFallbackVodRec from '../../containers/upsert-fallback-vod-rec/UpsertFallbackVodRec';
import { FallbackWrapper } from './Fallback.styled';

const Fallback = ({
  fallbackVodRec,
  fallbackVodRecError,
  handleAlertFallback,
}) => {
  return (
    <Container maxWidth="xl">
      <Marginer direction="horizontal" margin={40} />
      <FallbackWrapper>
        <UpsertFallbackVodRec
          fallbackVodRec={fallbackVodRec}
          fallbackVodRecError={fallbackVodRecError}
          handleAlertFallback={handleAlertFallback}
        />
      </FallbackWrapper>
      <Marginer direction="horizontal" margin={80} />
    </Container>
  );
};

export default Fallback;
