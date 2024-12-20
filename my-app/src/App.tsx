import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorPage, LoginPage, MainPage, 
         IOTPortalPage, SPKAPortalPage,
         RestaurantPage, WorkerPage, 
         SiteMapPage, SunburstPage,
         GaugePage, CalendarPage, ChartingPage } from './page';
import { RoutesClasses } from './utils';
import { HeaderBar, Footer, SideBar } from './components';
import ButtonGradient from './assets/svg/ButtonGradient';

const App = () => {
  return (
    <div className='mx-auto h-full p-4 shadow-2xl shadow-indigo-50 hover:shadow-lime-500/50'>
      <Router >
        <HeaderBar />
          <SideBar />
          <div className={RoutesClasses}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/IOTPortals" element={<IOTPortalPage />} />
              <Route path="/SPKAPortals" element={<SPKAPortalPage />} />
              <Route path="/sitemap" element={<SiteMapPage />} />
              <Route path="/gauge" element={<GaugePage />} />
              <Route path="/charting" element={<ChartingPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/restaurants" element={<RestaurantPage />} />
              <Route path="/sunburst" element={<SunburstPage />} />
              <Route path="/workers" element={<WorkerPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        <Footer />
      </Router>
      <ButtonGradient />
    </div>
  );
};

export default App;