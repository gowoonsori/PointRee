import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SettingsPassword from 'src/components/settings/SettingsPassword';
import Auth from 'src/hoc/auth';

const SettingsView = () => (
  <>
    <Helmet>
      <title>비밀번호 수정 | Point Ree</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </>
);

export default Auth(SettingsView, ['USER', 'ADMIN']);
