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
import { isExpired } from '../../utils/date';

const Home = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [alertFallback, setAlertFallback] = React.useState(0);
  const { data: fallbackVodRec, error: fallbackVodRecError } =
    useFallbackVodRec();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAlertFallback = (recFallback) => {
    //todo quando ci sarà il BE da rivedere
    let isExpiredFlag = 0;
    let rec = Array.isArray(recFallback)
      ? recFallback[0].recommendation
      : recFallback.recommendation;
    for (var i = 0; i < rec.length; i++) {
      if (isExpired(rec[i].endProgram)) {
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
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
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
              icon={<Warning />}
              iconPosition="end"
              label="Fallback"
            />
          )}
        </Tabs>

        {selectedTab === 0 && <Schedule />}
        {selectedTab === 1 && (
          <Fallback
            fallbackVodRec={fallbackVodRec}
            fallbackVodRecError={fallbackVodRecError}
            handleAlertFallback={handleAlertFallback}
          />
        )}
      </Container>
    </>
  );
};
export default Home;
