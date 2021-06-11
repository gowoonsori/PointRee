import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { savePoint } from 'src/atoms/dashboard';
import { useRecoilValue } from 'recoil';

const TotalPoints = () => {
  const totalSavePoints = useRecoilValue(savePoint);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              총 적립 금액
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {totalSavePoints} 원
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[500],
                height: 56,
                width: 56
              }}
            >
              <AddCircleOutlineIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default TotalPoints;
