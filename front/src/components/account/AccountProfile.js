import { useRecoilValue } from 'recoil';
import { userInfo } from 'src/atoms/user';
import { Box, Card, CardContent, Divider, Typography } from '@material-ui/core';

const AccountProfile = (props) => {
  const info = useRecoilValue(userInfo);

  return (
    <Card sx={{ background: '#f3f5f72e' }} {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography color="textPrimary" gutterBottom variant="h1">
            {info.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {info.phoneNumber}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            기본 적립율 : {info.accumulationRate}%
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default AccountProfile;
