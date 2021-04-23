import { useRecoilValue } from 'recoil';
import { user } from 'src/reducers/user';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core';

const AccountProfile = (props) => {
  const userData = useRecoilValue(user);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={userData.avatar}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userData.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {userData.telephone}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            기본 적립율 : {userData.accumerlate}%
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
