// import './App.css';
import { Navbar,Footer } from "./Components";
import { CrowdFundingprovider } from "./Context/CrowdFunding";
import Campaign from "./Components/Campaign";
function App() {
  return (
    <div className="App">
      <CrowdFundingprovider>
      <Navbar/>
      <Campaign/>
      <Footer/>
      </CrowdFundingprovider>
    </div>
  );
}

export default App;
