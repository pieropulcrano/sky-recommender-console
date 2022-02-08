import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Marginer from '../../components/marginer/Marginer';
import UpsertFallbackVodRec from '../../containers/upsert-fallback-vod-rec/UpsertFallbackVodRec';
import { FallbackWrapper } from './Fallback.styled';

/**
 * Component that renders the form to edit the vod fallback events.
 */

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

Fallback.propTypes = {
  /**
   * Vod events used as fallback.
   */
  fallbackVodRec: PropTypes.array.isRequired,
  /**
   * Indicates if there was error during
   */
  fallbackVodRecError: PropTypes.bool,
  /**
   * Gets called when one ore more events are invalid (out of date, not ready, image not available).
   * @param {Array} data - Fallback vod events.
   */
  handleAlertFallback: PropTypes.func.isRequired,
};

export default Fallback;
