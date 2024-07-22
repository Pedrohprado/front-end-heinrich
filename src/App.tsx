import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Context from './globalcontext/globalcontext';
import ProtectRouter from './helpers/protectrouter';
import RegisterValidation from './page/registervalidation';
import NewRegister from './page/newregister';
import Login from './page/login';
import Header from './components/header';
import Home from './page/home';
import MyRegisters from './page/myregisters';
import MyRegistersValidation from './page/myregistersvalidation';
// import Footer from './components/footer';

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
                <Home />
              </ProtectRouter>
            }
          />
          <Route
            path='/myregisters'
            element={
              <ProtectRouter>
                <MyRegisters />
              </ProtectRouter>
            }
          />
          <Route
            path='/novoregistro'
            element={
              <ProtectRouter>
                <NewRegister />
              </ProtectRouter>
            }
          />

          <Route
            path='/registrosparavalidacao'
            element={
              <ProtectRouter>
                <RegisterValidation />
              </ProtectRouter>
            }
          />
          <Route
            path='/registrosvalidados'
            element={
              <ProtectRouter>
                <MyRegistersValidation />
              </ProtectRouter>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </Context>
  );
}

export default App;
