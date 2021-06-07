import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';
import Auth from 'src/hoc/auth';

const Introduce = () => (
  <>
    <Helmet>
      <title>Point Ree</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          PoinRee
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Inroduce
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/auth.jpeg"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default Auth(Introduce);
