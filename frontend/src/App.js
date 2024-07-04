import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Outlet, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'; // Add Route and Redirect
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/authenticate/Authenticate';
import Activate from './pages/activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';




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


//import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';

// const GuestRoute = ({ children, ...rest }) => {
//     const { isAuth } = useSelector((state) => state.auth);
//     return !isAuth ? (
//         children || <Outlet />
//     ) : (
//         <Navigate to={{ pathname: '/rooms' }} replace />
//     );
// };

// const SemiProtectedRoute = ({ children, ...rest }) => {
//     const { user, isAuth } = useSelector((state) => state.auth);
//     console.log(user,"user");
//     return !isAuth ? (
//         <Navigate to={{ pathname: '/' }} replace />
//     ) : isAuth && !user.activated ? (
//         children || <Outlet />
//     ) : (
//         <Navigate to={{ pathname: '/rooms' }} replace />
//     );
// };

// const ProtectedRoute = ({ children, ...rest }) => {
//     const { user, isAuth } = useSelector((state) => state.auth);
//     return !isAuth ? (
//         <Navigate to={{ pathname: '/' }} replace />
//     ) : isAuth && !user.activated ? (
//         <Navigate to={{ pathname: '/activate' }} replace />
//     ) : (
//         children || <Outlet />
//     );
// };

// export { GuestRoute, SemiProtectedRoute, ProtectedRoute };




function App() {
    {JSON.stringify(Loader)}
  
  // call refresh end point 

 const {loading} = useLoadingWithRefresh();
  return (
    loading ? ( <Loader message ="Loading please wait" />):(
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

    // <BrowserRouter>
    //         <Navigation />
    //         <Routes>
    //             <Route path="/" element={<GuestRoute />}>
    //                 <Route index element={<Home />} />
    //             </Route>
    //             <Route path="/authenticate" element={<GuestRoute />}>
    //                 <Route index element={<Authenticate />} />
    //             </Route>
    //             <Route path="/activate" element={<SemiProtectedRoute />}>
    //                 <Route index element={<Activate />} />
    //             </Route>
    //             <Route path="/rooms" element={<ProtectedRoute />}>
    //                 <Route index element={<Rooms />} />
    //             </Route>
    //         </Routes>
    //   </BrowserRouter>
    )
  );
}

export default App;
