import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './page/login';
import Context from './globalcontext/globalcontext';
import ProtectRouter from './helpers/protectrouter';
import RegisterValidation from './page/registervalidation';
import Registers from './page/registers';
import NewRegister from './components/newregister';

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Registers />} />
          <Route path='/novoregistro' element={<NewRegister />} />

          <Route
            path='/register/validation'
            element={
              <ProtectRouter>
                <RegisterValidation />
              </ProtectRouter>
            }
          />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
