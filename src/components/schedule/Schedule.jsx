import React from 'react';
import Container from '@mui/material/Container';
import Scheduler from '../scheduler/Scheduler';
import Marginer from '../marginer/Marginer';

/**
 * Component rendered in the schedule tab of the home.
 */

const Schedule = () => {
  return (
    <Container maxWidth="xl">
      <Marginer direction="horizontal" margin={20} />
      <Container maxWidth="xl">
        <Marginer direction="horizontal" margin={40} />
        <Scheduler />
      </Container>
      <Marginer direction="horizontal" margin={80} />
    </Container>
  );
};

export default Schedule;
