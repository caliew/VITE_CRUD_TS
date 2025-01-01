import { Route, Routes } from "react-router-dom";
import { useErrorHandler, ErrorBoundary } from "react-error-boundary";
import {
  ErrorFallback,PageNotFound,
  LoginPage,
  MainPage,
  IOTPortalPage,
  SPKAPortalPage,
  RestaurantPage,
  WorkerPage,
  SiteMapPage,
  SunburstPage,
  GaugePage,
  CalendarPage,
  ChartingPage,
} from "./features";
import { RoutesClasses } from "@shared/utils";
import { Button, HeaderBar, Footer, SideBar } from "@shared/components";
import ButtonGradient from "@assets/svg/ButtonGradient";

const App = () => {

  const handleError = useErrorHandler();  
  const handleSimulateError = () => { 
    handleError(new Error('Simulated error')); 
  };  
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
        <Button className="font-Roboto text-2xl font-extralight" onClick={handleSimulateError}>SIMULATE ERROR..</Button>
        <Footer />
        <ButtonGradient />
      </ErrorBoundary>
    </div>
  );
};

export default App;
