import './App.css';
import { BrowserRouter, Navigate, Outlet, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'; // Add Route and Redirect
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/authenticate/Authenticate';
import Activate from './pages/activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';



// const isAuth = false;
// const user = {
//   activated: false,
// }

const GuestRoute = () => {
  const {isAuth} = useSelector((state)=>state.auth);
  return (
    isAuth ? <Navigate to='/rooms' /> : <Outlet />
  )
};
const SemiProtectedRoute = () => {
  const {user,isAuth} = useSelector((state)=>state.auth);
  return (
    !isAuth ? <Navigate to='/' /> : (isAuth && !user.activated ? <Outlet /> : <Navigate to='/rooms' />)
  )
};

const ProtectedRoute = () => {
  const {user,isAuth} = useSelector((state)=>state.auth);
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
