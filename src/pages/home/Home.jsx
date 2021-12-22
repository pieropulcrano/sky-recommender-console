import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Schedule from '../../pages/schedule/Schedule';
import Fallback from '../../pages/fallback/Fallback';
import Marginer from '../../components/marginer/Marginer';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Home = () => {
  const history = useHistory();
  const { page } = useParams();

  const tabNameToIndex = {
    0: 'schedule',
    1: 'fallback',
  };

  const indexToTabName = {
    schedule: 0,
    fallback: 1,
  };

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <>
      <AppBar position="static">
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
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Schedule" />
          <Tab label="Fallback" />
        </Tabs>
        {selectedTab === 0 && <Schedule />}
        {selectedTab === 1 && <Fallback />}
      </Container>
    </>
  );
};
export default Home;
