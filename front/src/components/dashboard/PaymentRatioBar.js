import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme, colors } from '@material-ui/core';
import { monthDates } from 'src/atoms/date';
import { paymentBar } from 'src/atoms/dashboard';
import { useRecoilValue } from 'recoil';

const PaymentRatioBar = () => {
  const theme = useTheme();
  const monthAndDates = useRecoilValue(monthDates);
  const paymentData = useRecoilValue(paymentBar);

  const data = {
    datasets: [
      {
        backgroundColor: colors.blue[700],
        data: paymentData[0].length > 0 ? paymentData[0] : [0],
        label: '카드'
      },
      {
        backgroundColor: colors.deepOrange[300],
        data: paymentData[1].length > 0 ? paymentData[1] : [0],
        label: '현금'
      }
    ],
    labels: monthAndDates
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  return (
    <Card>
      <CardHeader title="결제 비율" sx={{ background: '#fcfcfc' }} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 426,
            position: 'relative'
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default PaymentRatioBar;
