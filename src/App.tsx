import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' />
        <Route path='/home' />
        <Route path='/register' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
