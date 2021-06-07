import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { userInfo } from 'src/atoms/user';

const AccountProfileDetails = (props) => {
  const [info, setInfo] = useRecoilState(userInfo);

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="내정보 수정" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="상호 이름"
                name="name"
                onChange={handleChange}
                required
                value={info.name}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={info.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="전화번호"
                name="phoneNumber"
                required
                onChange={handleChange}
                value={info.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="적립율"
                name="accumulationRate"
                onChange={handleChange}
                required
                value={info.accumulationRate}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained">
            수정하기
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
