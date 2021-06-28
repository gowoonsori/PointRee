import { Line } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme, colors } from '@material-ui/core';
import { monthDates } from 'src/atoms/date';
import { salesVolumeLine } from 'src/atoms/dashboard';
import { useRecoilValue } from 'recoil';

const SalesVolumeLine = () => {
  const theme = useTheme();
  const monthAndDates = useRecoilValue(monthDates);
  const salesVolumeData = useRecoilValue(salesVolumeLine);

  const data = {
    datasets: [
      {
        backgroundColor: colors.blue[300],
        borderColor: colors.blue[700],
        data: [...salesVolumeData],
        fill: false,
        label: '판매량'
      }
    ],
    labels: monthAndDates
  };
  const options = {
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
      <CardHeader title="판매량" sx={{ background: '#fcfcfc' }} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 426,
            position: 'relative'
          }}
        >
          <Line data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default SalesVolumeLine;
