import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme, colors } from '@material-ui/core';

const data = {
  datasets: [
    {
      backgroundColor: colors.indigo[500],
      data: [18, 5, 19],
      label: '신규 고객'
    },
    {
      backgroundColor: colors.pink[300],
      data: [11, 20, 12],
      label: '재방문 고객'
    }
  ],
  labels: ['1 Aug', '2 Aug', '3 Aug']
};
const CustomerKindsBar = () => {
  const theme = useTheme();

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
      <CardHeader title="고객 비율" />
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

export default CustomerKindsBar;
