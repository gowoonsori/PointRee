import { Helmet } from 'react-helmet';
import { Box, Card, Typography, experimentalStyled, SvgIcon } from '@material-ui/core';
import IntroButton from 'src/components/buttons/IntroButton';
import { GitHub as GitHubIcon } from 'react-feather';
import Auth from 'src/hoc/auth';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'src/atoms/user';

const IntroCatainer = experimentalStyled('div')(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: 0,
  margin: 0,
  marginBottom: 20,
  textAlign: 'center',
  color: '#eeeeee'
}));

const ContentCatainer = experimentalStyled('div')({
  maxWidth: 'md',
  padding: 40,
  textAlign: 'center'
});

const GithubContainer = experimentalStyled('div')(({ theme }) => ({
  marginTop: 40,
  display: 'flex',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

const Introduce = () => {
  const info = useRecoilValue(userInfo);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="별도의 앱 설치 없이 웹을 통해 간편하게 포인트적립서비스를 제공하는 pointRee의 main 페이지입니다."
        />
        <title>Point Ree</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <IntroCatainer>
          <Box sx={{ my: 6 }}>
            <Typography variant="h2">Start Points Service,&nbsp; Easy.</Typography>
            <Typography variant="subtitle1">Let&apos;s start points service easily on the web.</Typography>
          </Box>
          {info?.name ? (
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <IntroButton value="적립하러 가기" link="points" />
              <IntroButton value="대시보드 가기" link="dashboard" />
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <IntroButton value="로그인 하러가기" link="login" />
              {/* <IntroButton value="회원가입" link="register"  /> */}
            </Box>
          )}
        </IntroCatainer>
        <ContentCatainer>
          <Box>
            <Typography sx={{ mb: 1 }} align="left" variant="h3">
              PointRee는 포인트 적립서비스를 위한 웹사이트 입니다.
            </Typography>
            <Typography align="left" variant="subtitle2">
              현재는 개인정보와 서비스 품질에 관한 문제로 회원가입을 제공하지 않습니다. <br />
              대신, Test용 Id는 제공하고 있는데 다음과 같습니다. ( email : test@test.com, &nbsp;&nbsp; password: 1234 ){' '}
              <br />
              추후에 정비하여 서비스 시작하겠습니다.
            </Typography>
          </Box>
          <GithubContainer>
            <Box sx={{ minWidth: '320px', width: '100%', maxWidth: '500px', mr: 3 }}>
              <a href="https://github.com/gowoonsori/PointRee">
                <Card sx={{ px: 4, py: 5, m: '0 auto', mb: 3 }}>
                  <SvgIcon sx={{ mr: 2, display: 'inline', fontSize: '3em' }} fontSize="large" color="action">
                    <GitHubIcon />
                  </SvgIcon>
                  <Box sx={{ display: 'inline-block' }}>
                    <Typography variant="h2">Github Repository</Typography>
                    <Typography variant="subtitle1">@gowoonsori</Typography>
                  </Box>
                </Card>
              </a>
            </Box>
            <Box>
              <Typography align="left">
                소스코드에 관한 내용은 GitHub에 공개되어 있어 확인이 가능합니다.
                <br />
                반응형 디자인이 처음이다보니 이상할 수 있습니다. 수정사항 및 버그는 Issue나 PR 날려주시면
                감사하겠습니다.
                <br />
                전체적인 디자인은 Material-Ui를 사용했습니다.
              </Typography>
            </Box>
          </GithubContainer>
        </ContentCatainer>
      </Box>
    </>
  );
};
export default Auth(Introduce);
