import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import localeData from 'dayjs/plugin/localeData';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';

import { Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route } from "react-router-dom";

import { PageNotFound, LoginPage, MainPage, 
  IOTPortalPage, SPKAPortalPage, RestaurantPage,
  WorkerPage, SiteMapPage, SunburstPage, GaugePage,
  CalendarPage, ChartingPage, ErrorFallback
} from "@features/index";

import { RoutesClasses } from "@shared/utils/classname";
import { HeaderBar, Footer} from "@shared/components";
import { SideBar } from '@shared/components/SideBar'
import ButtonGradient from "@assets/svg/ButtonGradient";
import SectionSvg from '@shared/assets/svg/SectionSvg';

dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(isToday);
dayjs.extend(isBetween);

const App = () => {

  const handleReset = () => {
    console.log('Error boundary reset triggered.');
    window.location.reload(); // Example: Reload the page
  };

  return (
    <div className="mx-auto h-full p-4 shadow-2xl shadow-indigo-50 hover:shadow-lime-500/50">\
      <HeaderBar />
      <SideBar />
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={handleReset}
        onError={(error, info) => {
          console.error('Logging error:', error);
          console.info('Error info:', info);
        }}>
        <Suspense fallback={null}>
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
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </Suspense>
        <Footer />
        <ButtonGradient />
      </ErrorBoundary>
    </div>
  );
};

export default App;
