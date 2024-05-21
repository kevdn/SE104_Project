import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import Forgot from './Components/ForgotPassword/Forgot';
import Register from './Components/Register/Register';

import MainMenu from './Components/MainMenu/MainMenu';
import Customers from './Components/MainMenu/Customers';
import ChangingRules from './Components/MainMenu/ChangingRules';
import Devices from './Components/MainMenu/Devices';
import Service1 from './Components/MainMenu/Service1';
import Service2 from './Components/MainMenu/Service2';
import Service3 from './Components/MainMenu/Service3';
import Service4 from './Components/MainMenu/Service4';
import Service5 from './Components/MainMenu/Service5';
import Statistics1 from './Components/MainMenu/Statistics1';
import Statistics2 from './Components/MainMenu/Statistics2';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/MainMenu" element={<MainMenu />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/ChangingRules" element={<ChangingRules />} />
          <Route path="/Devices" element={<Devices />} />

          <Route path="/Service1" element={<Service1 />} />
          <Route path="/Service2" element={<Service2 />} />
          <Route path="/Service3" element={<Service3 />} />
          <Route path="/Service4" element={<Service4 />} />
          <Route path="/Service5" element={<Service5 />} />
          
          <Route path="/Statistics1" element={<Statistics1 />} />
          <Route path="/Statistics2" element={<Statistics2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;