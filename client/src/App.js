import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Predict from './components/predictPage';
import Predict from './components/predictPage2';
import ForecastPage from './components/forecastPage';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './components/home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login'
import Upload from './pages/upload/Upload'
function App() {
    const router=createBrowserRouter([
        {path:"/lstm",
        element:<ForecastPage/>},
        {path:"/xgb",
        element:<Predict/>},
        {path:"/",
        element:<Home/>},
        {path:"/signup",
        element:<Signup/>},
        {path:"/login",
        element:<Login/>},
        {path:"/upload",
        element:<Upload/>},
    ])
    return (
        <div className='w-full min-h-screen mt-0 pt-0  ' >
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
