import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  return <BrowserRouter>
  <Navigation/>
  <Routes>


    <Route exact path="/" element={<Home/>} />
    <Route exact path="/register" element={<Register/>} />
    <Route exact path="/login" element={<Login/>} />
  </Routes>
  
  </BrowserRouter>;
}

export default App;
