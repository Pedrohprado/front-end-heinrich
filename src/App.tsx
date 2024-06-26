import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Context from './globalcontext/globalcontext';
import ProtectRouter from './helpers/protectrouter';
import RegisterValidation from './page/registervalidation';
import Registers from './page/registers';
import NewRegister from './components/newregister';
import Login from './page/login';
import Header from './components/header';

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/'
            element={
              <ProtectRouter>
                <Registers />
              </ProtectRouter>
            }
          />
          <Route path='/novoregistro' element={<NewRegister />} />

          <Route
            path='/registrosparavalidacao'
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
