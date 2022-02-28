import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Schedule from '../../components/schedule/Schedule';
import Fallback from '../../components/fallback/Fallback';
import Marginer from '../../components/marginer/Marginer';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabIcon, Warning } from './Home.styled';
import useFallbackVodRec from '../../hooks/useFallbackVodRec';

/**
 * Component rendered when the user lands on the site homepage.
 */

const Home = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [alertFallback, setAlertFallback] = React.useState(0);
  const { data: fallbackVodRec } = useFallbackVodRec();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAlertFallback = (recFallback) => {
    let isExpiredFlag = 0;
    let rec = recFallback.items[0].recommendation;
    for (var i = 0; i < rec.length; i++) {
      if (rec[i].warningMessage !== '') {
        isExpiredFlag = 1;
      }
    }
    setAlertFallback(isExpiredFlag);
  };

  React.useEffect(() => {
    if (fallbackVodRec) {
      handleAlertFallback(fallbackVodRec);
    }
  }, [fallbackVodRec]);

  return (
    <>
      <AppBar data-test="app-bar" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div">
              SKY Recommender Console
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ m: 2 }} />
      <Container maxWidth="xl">
        <Marginer direction="horizontal" margin={10} />
        <Tabs data-test="nav-tabs" value={selectedTab} onChange={handleChange}>
          <Tab label="Schedule" />
          {alertFallback === 0 && (
            <Tab data-test="fallback-nav-tab" label="Fallback" />
          )}
          {alertFallback === 1 && (
            <TabIcon
              data-test="fallback-nav-tab"
              icon={<Warning data-testid="warning-fallback" />}
              iconPosition="end"
              label="Fallback"
            />
          )}
        </Tabs>

        {selectedTab === 0 && <Schedule />}
        {selectedTab === 1 && (
          <Fallback handleAlertFallback={handleAlertFallback} />
        )}
      </Container>
    </>
  );
};
export default Home;
