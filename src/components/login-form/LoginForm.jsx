import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextInput from '../form/text-input/TextInput';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Marginer from '../marginer/Marginer';
import Box from '@mui/material/Box';
import { validationSchema } from './validation';
import { initialValues } from './config';
import { LoginBackgroud, LoadingButtonBlock } from './LoginForm.styled';

export default function LoginForm({ onSubmit, isSubmitting }) {
  const handleSubmit = (values) => onSubmit(values);

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
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <LoginBackgroud variant="elevation" elevation={2}>
              <Grid item>
                <Typography component="h1" variant="h5" align="center">
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <Form>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextInput
                        fullWidth
                        label="Username"
                        name="user_name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item>
                      <TextInput
                        type="password"
                        fullWidth
                        name="password"
                        label="Password"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item>
                      <LoadingButtonBlock
                        loading={isSubmitting}
                        type="submit"
                        variant="contained"
                      >
                        Login
                      </LoadingButtonBlock>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
            </LoginBackgroud>
          </Grid>
        </Formik>
      </Container>
    </>
  );
}

LoginForm.propTypes = {
  /**
   * The form is performing a submitting operation
   */
  isSubmitting: PropTypes.bool.isRequired,
  /**
   * Callback function called when the user clicks on the submit button.
   */
  onSubmit: PropTypes.func.isRequired,
};
