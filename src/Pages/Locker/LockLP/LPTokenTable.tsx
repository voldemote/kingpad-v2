import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import { TokenSwitch } from 'src/Components/Switch/TokenSwitch';
import { KingpadAdLogo, BnbLogo } from 'src/Config/Images';

interface rowsType {
  id: number;
  logo: string;
  token: string;
  symbol: string;
  amount: string;
  value: string;
  chain: string;
}

function createData(
  id: number,
  logo: string,
  token: string,
  symbol: string,
  amount: string,
  value: string,
  chain: string
) {
  return { id, logo, token, symbol, amount, value, chain };
}

const rows: rowsType[] = [
  createData(1, KingpadAdLogo, 'Cradle of Sins', 'Cos', '1,000,000,000,000', '$ 312,756', BnbLogo),
  createData(2, KingpadAdLogo, 'Cradle of Sins', 'Cos', '1,000,000,000,000', '$ 312,756', BnbLogo),
  createData(3, KingpadAdLogo, 'Cradle of Sins', 'Cos', '1,000,000,000,000', '$ 312,756', BnbLogo),
  createData(4, KingpadAdLogo, 'Cradle of Sins', 'Cos', '1,000,000,000,000', '$ 312,756', BnbLogo),
  createData(5, KingpadAdLogo, 'Cradle of Sins', 'Cos', '1,000,000,000,000', '$ 312,756', BnbLogo),
  createData(6, KingpadAdLogo, 'Cradle of Sins', 'Cos', '1,000,000,000,000', '$ 312,756', BnbLogo)
];

export const LPTokenTable = () => {
  const theme = useTheme();
  return (
    <LPTokenTableContainer>
      <TokenSwitch name1="Token" name2="LP Token" title="token" />
      <LpTokenTableWrapper>
        <LpTokenSearchBar placeholder="Search token" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#8462F6' : '#1A023E',
                    fontFamily: 'gotham-bold !important'
                  }}
                >
                  Logo
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#8462F6' : '#1A023E',
                    fontFamily: 'gotham-bold !important'
                  }}
                >
                  Token
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#8462F6' : '#1A023E',
                    fontFamily: 'gotham-bold !important'
                  }}
                >
                  Symbol
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#8462F6' : '#1A023E',
                    fontFamily: 'gotham-bold !important'
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#8462F6' : '#1A023E',
                    fontFamily: 'gotham-bold !important'
                  }}
                >
                  Value
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#8462F6' : '#1A023E',
                    fontFamily: 'gotham-bold !important'
                  }}
                >
                  Chain
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <ImgWrapper>
                      <Img src={row.logo} alt="logo" />
                    </ImgWrapper>
                  </TableCell>
                  <TableCell>{row.token}</TableCell>
                  <TableCell>{row.symbol}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>
                    <ImgWrapper>
                      <Img src={row.chain} alt="bnb-logo" />
                    </ImgWrapper>
                  </TableCell>
                  <TableCell>
                    <ViewButton>View</ViewButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length === 0 ? <NoTokenFound>No token found</NoTokenFound> : <LoadMore>Load more</LoadMore>}
      </LpTokenTableWrapper>
    </LPTokenTableContainer>
  );
};

const LPTokenTableContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '13px'
}));

const LpTokenTableWrapper = styled(Box)(({ theme }) => ({
  boxShadow: '0px 3px 6px #00000029',
  backgroundColor: theme.palette.dark.main,
  width: '100%',
  borderRadius: '15px',
  padding: '27px 38px',
  display: 'flex',
  flexDirection: 'column',
  gap: '27px',
  alignItems: 'center'
}));

const LpTokenSearchBar = styled('input')(({ theme }) => ({
  padding: '16px 22px',
  borderRadius: '24px',
  width: '100%',
  height: '45px',
  outline: 'none',
  backgroundColor: 'inherit',
  border: `1px solid ${theme.palette.mode === 'light' ? '#707070' : '#FFFFFF'}`,
  fontSize: '13px',
  color: theme.palette.dark.contrastText
}));

const ImgWrapper = styled(Box)(({ theme }) => ({
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  backgroundColor: '#000000'
}));

const Img = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%'
}));

const ViewButton = styled(Button)(({ theme }) => ({
  width: '61px',
  height: '27px',
  backgroundColor: '#8462F6',
  borderRadius: '19px',
  color: '#FFFFFF',
  fontSize: '12px',
  '&:hover': {
    backgroundColor: '#8462F6'
  }
}));

const LoadMore = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  color: '#8462F6',
  fontFamily: 'gotham-bold',
  fontSize: '13px',
  width: '80px'
}));

const NoTokenFound = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: '#8462F6',
  fontSize: '16px',
  fontFamily: 'gotham-bold'
}));
