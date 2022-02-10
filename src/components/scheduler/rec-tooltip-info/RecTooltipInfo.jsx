import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import {
  TooltipContentWrapper,
  RecInfoWrapper,
  TooltipWrapper,
} from './RecTooltipInfo.styled';
import { formatToHumanReadable } from '../../../utils/date';

/**
 * Component that renders the content of the provided recommendation
 */

const TooltipContent = ({ recommendation, startDateTime, endDateTime }) => {
  const sorted = recommendation.sort(
    (prev, next) => prev.position - next.position,
  );

  return (
    <TooltipContentWrapper>
      <span>
        Start: {startDateTime && formatToHumanReadable(startDateTime)}
      </span>
      <span>End: {endDateTime && formatToHumanReadable(endDateTime)}</span>
      <br />
      {sorted.map((event, index) => (
        <span key={index}>
          {`${event.position}. `}
          {event.resolution && event.resolution === 'HD' && '[HD]'}{' '}
          {event.title}
        </span>
      ))}
    </TooltipContentWrapper>
  );
};

/**
 * Tooltip component that display informations about the provided recommendation.
 */

const RecTooltipInfo = ({
  title,
  recommendation,
  startDateTime,
  endDateTime,
}) => {
  return (
    <TooltipWrapper>
      <Tooltip
        title={
          <TooltipContent
            recommendation={recommendation}
            startDateTime={startDateTime}
            endDateTime={endDateTime}
          />
        }
      >
        <RecInfoWrapper>{title}</RecInfoWrapper>
      </Tooltip>
    </TooltipWrapper>
  );
};

RecTooltipInfo.propTypes = {
  /**
   * text visualized by the user
   */
  title: PropTypes.string.isRequired,
  /**
   *  array containing the recommendation events
   */
  recommendation: PropTypes.array.isRequired,
  /**
   *  the start date time of the recommendation
   */
  startDateTime: PropTypes.string.isRequired,
  /**
   *  the end date time of the recommendation
   */
  endDateTime: PropTypes.string,
};

export default RecTooltipInfo;
