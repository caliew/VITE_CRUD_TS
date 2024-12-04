import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorPage, LoginPage, MainPage, IOTPortalPage, RestaurantPage, WorkerPage } from './page';
import { Header, Footer, Sidebar } from './components';
import ButtonGradient from './assets/svg/ButtonGradient';

const App = () => {
  return (
    <div className=''>
      <Router >
        <Header />
        <div className='columns-1'>
          <Sidebar />
          <div className='relative left-64 w-9/12'>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/iotportals" element={<IOTPortalPage />} />
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