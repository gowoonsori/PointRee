import { Avatar, Card, CardContent, Grid, LinearProgress, Typography } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { salesVolume } from 'src/atoms/dashboard';
import { useRecoilValue } from 'recoil';

const TotalSalesVolume = () => {
  const totalSalesVolume = useRecoilValue(salesVolume);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              판매량
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {totalSalesVolume}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: orange[500],
                height: 56,
                width: 56
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default TotalSalesVolume;
