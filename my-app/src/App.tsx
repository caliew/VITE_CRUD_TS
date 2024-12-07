import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorPage, LoginPage, MainPage, IOTPortalPage, RestaurantPage, WorkerPage, SiteMapPage, ChartingPage } from './page';
import { RoutesClasses } from './utils';
import { HeaderBar, Footer, SideBar } from './components';
import ButtonGradient from './assets/svg/ButtonGradient';

const App = () => {
  return (
    <div className=''>
      <Router >
        <HeaderBar />
        <div className='columns-1'>
          <SideBar />
          <div className={RoutesClasses}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/iotportals" element={<IOTPortalPage />} />
              <Route path="/sitemap" element={<SiteMapPage />} />
              <Route path="/charting" element={<ChartingPage />} />
              <Route path="/restaurants" element={<RestaurantPage />} />
              <Route path="/workers" element={<WorkerPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
      <ButtonGradient />
    </div>
  );
};

export default App;