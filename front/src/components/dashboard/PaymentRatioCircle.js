import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, colors, useTheme } from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MoneyIcon from '@material-ui/icons/Money';
import { paymentRatio } from 'src/atoms/dashboard';
import { useRecoilValue } from 'recoil';

const PaymentRatioCircle = () => {
  const theme = useTheme();
  const paymentRatioData = useRecoilValue(paymentRatio);

  const data = {
    datasets: [
      {
        data: [paymentRatioData.card, paymentRatioData.cash],
        backgroundColor: [colors.blue[700], colors.deepOrange[300]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['카드', '현금']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: '카드',
      value: paymentRatioData.cardRatio,
      icon: CreditCardIcon,
      color: colors.blue[700]
    },
    {
      title: '현금',
      value: paymentRatioData.cashRatio,
      icon: MoneyIcon,
      color: colors.deepOrange[300]
    }
  ];

  return (
    <Card>
      <CardHeader title="결제 비율" sx={{ background: '#fcfcfc' }} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentRatioCircle;
