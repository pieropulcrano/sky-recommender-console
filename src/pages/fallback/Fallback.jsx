import React from 'react';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Marginer from '../../components/marginer/Marginer';
import UpsertFallbackVodRec from '../../containers/upsert-fallback-vod-rec/UpsertFallbackVodRec';

const FallbackWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70vh',
});

const Fallback = () => {
  return (
    <Container maxWidth="xl">
      <Marginer direction="horizontal" margin={40} />
      <FallbackWrapper>
        <UpsertFallbackVodRec />
      </FallbackWrapper>
      <Marginer direction="horizontal" margin={80} />
    </Container>
  );
};

export default Fallback;
