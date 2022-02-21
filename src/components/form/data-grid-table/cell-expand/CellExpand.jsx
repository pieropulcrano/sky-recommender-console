import React from 'react';
import PropTypes from 'prop-types';
import {
  CellDiv,
  CellValue,
  CellPopper,
  PopperContent,
  PopperValue,
  GridCellExpandWrapper,
} from './CellExpand.styled';

/**
 * Tooltip for a field of the DataGridTable.
 */

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(({ width, value }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <GridCellExpandWrapper
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      /** @todo remove */
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: 1,
        height: 1,
        position: 'relative',
        display: 'flex',
      }}
    >
      <CellDiv ref={cellDiv} width={width} />
      <CellValue ref={cellValue}>{value}</CellValue>

      {showPopper && (
        <CellPopper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
        >
          <PopperContent elevation={1}>
            <PopperValue variant="body2">{value}</PopperValue>
          </PopperContent>
        </CellPopper>
      )}
    </GridCellExpandWrapper>
  );
});

const CellExpand = (params) => {
  return (
    <GridCellExpand
      value={params.value || ''}
      width={params.colDef.computedWidth}
    />
  );
};

CellExpand.propTypes = {
  params: PropTypes.object.isRequired,
};

export default CellExpand;
