import './App.css';
import { BrowserRouter, Navigate, Outlet, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'; // Add Route and Redirect
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/authenticate/Authenticate';
import Activate from './pages/activate/Activate';

// import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
// import Room from './pages/Room/Room';
import { useSelector } from 'react-redux';
// import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
// import Loader from './components/shared/Loader/Loader';


const isAuth = false;
const user = {
  activated: false,
}

const GuestRoute = () => {
  return (
    isAuth ? <Navigate to='/rooms' /> : <Outlet />
  )
};
const SemiProtectedRoute = () => {
  return (
    !isAuth ? <Navigate to='/' /> : (isAuth && !user.activated ? <Outlet /> : <Navigate to='/rooms' />)
  )
};

const ProtectedRoute = () => {
  return (
    !isAuth ? <Navigate to='/' /> : (isAuth && !user.activated ? <Navigate to='/activate' /> : <Outlet />)
  )
};



function App() {
  // call refresh endpoint
  // const { loading } = useLoadingWithRefresh();

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>

        <Route element={<GuestRoute />}>
          <Route path="/" exact element={<Home />} />
          <Route path='/authenticate' element={<Authenticate />} />
        </Route>

        <Route element={<SemiProtectedRoute />}>
          <Route path='/activate' element={<Activate />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/rooms' element={<Rooms />} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
