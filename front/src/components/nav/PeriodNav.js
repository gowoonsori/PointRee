import { useCallback, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  experimentalStyled,
  InputLabel,
  FormControl
} from '@material-ui/core';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import 'src/css/dateRangePicker.css';
import 'src/css/calender.css';
import { useRecoilValue, useRecoilState } from 'recoil';
import { today, period, select } from 'src/atoms/date';
import { dateTimeToApiFormat } from 'src/hooks/dateFormatting';
import { dashboard, isGetData } from 'src/atoms/dashboard';
import axios from 'axios';
import { openAlert } from 'src/atoms/alert';

const SetPeriodContainer = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  width: '100%',
  borderBottom: '1px solid #e2e2e2',
  padding: '8px'
}));

const PeriodNav = () => {
  const todayDate = useRecoilValue(today);
  const periodList = useRecoilValue(period);
  const [selectedDate, setSelectedDate] = useRecoilState(select);
  const [dashboardData, setDashBoardData] = useRecoilState(dashboard);
  const [setAlert, setOpenAlert] = useRecoilState(openAlert);
  const [isGet, setIsGet] = useRecoilState(isGetData);

  const selectPeriod = useCallback(
    (e) => {
      setSelectedDate([periodList[e.target.value], todayDate]);
    },
    [todayDate, periodList, setSelectedDate]
  );

  const getStatistics = useCallback(async () => {
    setIsGet(false);
    const date = dateTimeToApiFormat(selectedDate);
    const res = await axios
      .get(`http://localhost:8999/api/orders/date?preDate=${date[0]}&postDate=${date[1]}`)
      .catch((error) => {
        if (error?.response) setOpenAlert({ message: error.response.data.error.message, severity: 'error' });
        else setOpenAlert({ message: '서버로부터 응답이 없습니다.', severity: 'error' });
        return null;
      });

    if (res?.data?.response) {
      setDashBoardData(res.data.response);
    }
    setIsGet(true);
  }, [selectedDate, setDashBoardData, setOpenAlert, setIsGet]);

  useEffect(async () => {
    setSelectedDate([todayDate, todayDate]);
    await getStatistics();
    setIsGet(true);
  }, []);

  return (
    <SetPeriodContainer>
      <Box sx={{ p: 3, width: '70%', minWidth: '160px', borderRight: '1px solid #e2e2e2' }}>
        <Typography variant="h3">기간 설정</Typography>
      </Box>
      <Box sx={{ width: '30%', minWidth: '100px', p: 2, borderRight: '1px solid #e2e2e2' }}>
        <FormControl sx={{ width: '95%' }}>
          <InputLabel id="select-date">기간 설정</InputLabel>
          <Select defaultValue="current" labelId="select-date" id="select-date" onChange={selectPeriod}>
            <MenuItem value="current">오늘</MenuItem>
            <MenuItem value="third">최근 3일</MenuItem>
            <MenuItem value="week">최근 7일</MenuItem>
            <MenuItem value="month">최근 30일</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DateRangePicker onChange={setSelectedDate} clearIcon={null} value={selectedDate} maxDate={todayDate} />
      <Box sx={{ minWidth: '100px', px: 2, py: 2, borderLeft: '1px solid #e2e2e2' }}>
        <Button sx={{ p: 2, fontWeight: 600 }} color="primary" fullWidth variant="contained" onClick={getStatistics}>
          조회
        </Button>
      </Box>
    </SetPeriodContainer>
  );
};

export default PeriodNav;
