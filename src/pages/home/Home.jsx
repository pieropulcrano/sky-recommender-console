import React from 'react';
import PropTypes from 'prop-types';
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
import IconButton from '@mui/material/IconButton';
import { TabIcon, Warning, LogoutIcon } from './Home.styled';
import useFallbackVodRec from '../../hooks/useFallbackVodRec';
import useToken from '../../hooks/useToken';

/**
 * Component rendered when the user lands on the site homepage.
 */

const Home = ({ removeToken }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [alertFallback, setAlertFallback] = React.useState(0);
  const { token } = useToken();
  const { data: fallbackVodRec } = useFallbackVodRec(token);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAlertFallback = (recFallback) => {
    let isExpiredFlag = 0;
    let rec = recFallback.items[0]?.recommendation;
    for (var i = 0; i < rec?.length; i++) {
      if (
        rec[i] !== undefined &&
        rec[i].hasOwnProperty('warningMessage') &&
        rec[i].warningMessage !== ''
      ) {
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
            <Typography variant="h6" component="div" flexGrow="1">
              SKY Recommender Console
            </Typography>
            <IconButton onClick={() => removeToken()}>
              <LogoutIcon />
            </IconButton>
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

        {selectedTab === 0 && <Schedule removeToken={removeToken} />}
        {selectedTab === 1 && (
          <Fallback
            handleAlertFallback={handleAlertFallback}
            removeToken={removeToken}
          />
        )}
      </Container>
    </>
  );
};
Home.propTypes = {
  /**
   * Callback function called when the user clicks on the Logout button.
   */
  removeToken: PropTypes.func.isRequired,
  /**
   * Perform logout
   */
  removeToken: PropTypes.func.isRequired,
};
export default Home;
