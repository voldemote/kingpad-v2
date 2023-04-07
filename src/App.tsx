import { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { PUBLIC_ROUTES } from './Config/routes';

import { AppThemeProvider } from './Provider';
import { Layout } from './Layouts/Layout';

import { Home } from './Pages/Home';
import StoreProvider from './Context/StoreContext';
import { CreatePresale } from './Pages/CreatePresale';
import { KingStarterExplore } from './Pages/CoinExplore/KingStarter';
import { KingSaleExplore } from './Pages/CoinExplore/KingSale';
import ScrollToTop from './Utils/scrollToTop';
import { KingStarter } from './Pages/LaunchPad/KingStarter';
import { Web3Provider } from './Context/Web3Context';
import { KingSale } from './Pages/LaunchPad/KingSale';
import { AuditPage } from './Pages/Security/Audit';
import { KYCPage } from './Pages/Security/KYC';
import { LockLP } from './Pages/Locker/LockLP';

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <Router>
        <StoreProvider>
          <Web3Provider>
            <AppThemeProvider>
              <Layout>
                <ScrollToTop />
                <Routes>
                  <Route path={PUBLIC_ROUTES.default} element={<Home />} />
                  <Route path={PUBLIC_ROUTES.home} element={<Home />} />
                  <Route path={PUBLIC_ROUTES.kingstarterExplore} element={<KingStarterExplore />} />
                  <Route path={PUBLIC_ROUTES.kingSaleExplore} element={<KingSaleExplore />} />
                  <Route path={PUBLIC_ROUTES.create} element={<CreatePresale />} />
                  <Route path={PUBLIC_ROUTES.kingstarter} element={<KingStarter />} />
                  <Route path={PUBLIC_ROUTES.kingsale} element={<KingSale />} />
                  <Route path={PUBLIC_ROUTES.audit} element={<AuditPage />} />
                  <Route path={PUBLIC_ROUTES.kyc} element={<KYCPage />} />
                  <Route path={PUBLIC_ROUTES.locklp} element={<LockLP />} />
                </Routes>
              </Layout>
            </AppThemeProvider>
          </Web3Provider>
        </StoreProvider>
      </Router>
    </Suspense>
  );
}

export default App;
