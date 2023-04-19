import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './scenes/dashboard';
import { Layout } from './scenes/layout';
import { Products } from './scenes/products';
import { Customers } from './scenes/customers';
import { Transactions } from './scenes/transactions';
import { Geography } from './scenes/geography';
import { Overview } from './scenes/overview';
import { Daily } from './scenes/daily';
import { Monthly } from './scenes/monthly';
import { Breakdown } from './scenes/breakdown';
import { Admins } from './scenes/admins';
import { Performance } from './scenes/performance';

function App() {
  const mode = useSelector((state: any) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to='/dashboard' replace/> }></Route>
              <Route path='/dashboard' element={<Dashboard />}></Route>
              <Route path='/products' element={<Products />}></Route>
              <Route path='/customers' element={<Customers />}></Route>
              <Route path='/transactions' element={<Transactions />}></Route>
              <Route path='/geography' element={<Geography />}></Route>
              <Route path='/overview' element={<Overview />}></Route>
              <Route path='/daily' element={<Daily />}></Route>
              <Route path='/monthly' element={<Monthly />}></Route>
              <Route path='/breakdown' element={<Breakdown />}></Route>
              <Route path='/admin' element={<Admins />}></Route>
              <Route path='/performance' element={<Performance />}></Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
