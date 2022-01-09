import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { TooltipContentWrapper, RecInfoWrapper } from './RecTooltipInfo.styled';
import { formatToHumanReadable } from '../../../utils/date';

const TooltipContent = ({ recommendation, startDateTime, endDateTime }) => {
  const sorted = recommendation.sort(
    (prev, next) => prev.position - next.position,
  );
  return (
    <TooltipContentWrapper>
      <span>Start: {formatToHumanReadable(startDateTime)}</span>
      <span>End: {formatToHumanReadable(endDateTime)}</span>
      <br />
      {sorted.map((event, index) => (
        <span key={index}>
          {`${event.position}. `}
          {event.resolution === 'HD' && '[HD]'} {event.title}
        </span>
      ))}
    </TooltipContentWrapper>
  );
};

const RecTooltipInfo = ({
  title,
  recommendation,
  startDateTime,
  endDateTime,
}) => {
  return (
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
  );
};

RecTooltipInfo.propTypes = {
  title: PropTypes.string.isRequired,
  recommendation: PropTypes.array.isRequired,
  startDateTime: PropTypes.instanceOf(Date).isRequired,
  endDateTime: PropTypes.instanceOf(Date),
};

export default RecTooltipInfo;
