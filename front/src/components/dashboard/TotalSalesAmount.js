import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';
import { price } from 'src/atoms/dashboard';
import { useRecoilValue } from 'recoil';

const TotalSalesAmount = () => {
  const totalSales = useRecoilValue(price);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              총 판매 금액
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {totalSales} 원
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[500],
                height: 56,
                width: 56
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalSalesAmount;
