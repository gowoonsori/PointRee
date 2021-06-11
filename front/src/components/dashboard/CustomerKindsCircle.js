import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, colors, useTheme } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import { customerKindsRatio } from 'src/atoms/dashboard';
import { useRecoilValue } from 'recoil';

const PaymentRatioCircle = () => {
  const theme = useTheme();
  const customerKindsRatioData = useRecoilValue(customerKindsRatio);

  const data = {
    datasets: [
      {
        data: [customerKindsRatioData.newCustomer, customerKindsRatioData.oldCustomer],
        backgroundColor: [colors.indigo[500], colors.pink[300]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['신규고객', '재방문고객']
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
      title: '신규 고객',
      value: customerKindsRatioData.newCustomerRatio,
      icon: PersonAddIcon,
      color: colors.indigo[500]
    },
    {
      title: '재방문 고객',
      value: customerKindsRatioData.oldCustomerRatio,
      icon: PersonIcon,
      color: colors.pink[300]
    }
  ];

  return (
    <Card>
      <CardHeader title="고객 비율" sx={{ background: '#fcfcfc' }} />
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
