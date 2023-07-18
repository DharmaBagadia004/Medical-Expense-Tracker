
import './App.css';
import Home from './components/Home/Home';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Home/>}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
