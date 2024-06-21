import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './page/login';
import Context from './globalcontext/globalcontext';

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' />
          <Route path='/register' />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
