import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './Components';
import { CrowdFundingProvider } from './Context/CrowdFunding';
import Campaign from './Components/Campaign';
import EasyLoan from './Components/EasyLoan'; // Corrected import statement
import LandingPage from './Components/LandingPage';
import PageNotFound from './Components/PageNotFound';
import Youtube from './Components/youtube';
import Chat from './Components/chat';
import Queries from './Components/queries';

function App() {
  return (
    <div className="App">
      <CrowdFundingProvider>
        <Router>
          <Content />
        </Router>
      </CrowdFundingProvider>
    </div>
  );
}

// New component to use the useLocation hook correctly
function Content() {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Navbar */}
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/EasyLoan" element={<EasyLoan />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;