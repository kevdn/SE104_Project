import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import Forgot from './Components/ForgotPassword/Forgot';
import Register from './Components/Register/Register';

import MainMenu from './Components/MainMenu/MainMenu';
import Customers from './Components/MainMenu/Customers';
import ChangingRules from './Components/MainMenu/ChangingRules';
import Devices from './Components/MainMenu/Devices';
import BanHang from './Components/MainMenu/BanHang';
import NhapHang from './Components/MainMenu/NhapHang';
import BaoCaoCongNo from './Components/MainMenu/BaoCaoCongNo';
import BaoCaoThang from './Components/MainMenu/BaoCaoThang';

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

          <Route path="/BanHang" element={<BanHang />} />
          <Route path="/NhapHang" element={<NhapHang />} />
          
          
          <Route path="/BaoCaoCongNo" element={<BaoCaoCongNo />} />
          <Route path="/BaoCaoThang" element={<BaoCaoThang />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;