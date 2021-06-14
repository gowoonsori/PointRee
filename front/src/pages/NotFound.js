import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';

const NotFound = () => (
  <>
    <Helmet>
      <meta
        name="description"
        content="별도의 앱 설치 없이 웹을 통해 간편하게 포인트적립서비스를 제공하는 pointRee입니다."
      />
      <title>404 | Point Ree</title>
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
          404: The page you are looking for isn’t here
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/undraw_page_not_found_su7k.svg"
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

export default NotFound;
