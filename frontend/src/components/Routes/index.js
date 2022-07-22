import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Profil from '../../pages/Profil'
import Admin from '../../pages/Admin'
import Logout  from '../../pages/Logout';
import Setting  from '../../pages/Setting';
import { UserContext } from '../../context';
import jwt_decode from "jwt-decode";
import axios, { instanceAxios } from '../../api/Axios';

const MyRoutes = () => {

    const [CurrentUser, setCurrentUser] = useState({});
    const [hasValidToken, setHasValidToken] = useState(null);

    useEffect(() => { 

        instanceAxios.get('/api/auth/token')
        .then(res => {
            const UserId = jwt_decode(res.data.accessToken).id
            instanceAxios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`
            axios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`
            instanceAxios.get(`/api/user/${UserId}`)
            .then(res => {
                setCurrentUser(res.data)
                if(!hasValidToken) setHasValidToken(true);
            })
        }).catch(() => setHasValidToken(false));

     }, [hasValidToken]);

    if(hasValidToken === null) { return (<div className='loader'></div>) }

    return (
        <Router>
            <UserContext.Provider value={{CurrentUser, setCurrentUser, hasValidToken, setHasValidToken}}>
                <Routes>
                    {<Route path="/" element={hasValidToken ? <Home/> : <Navigate replace to="/login" />} />}
                    {<Route path="/logout" element={hasValidToken ? <Logout/> : <Navigate replace to="/login" />} />}
                    {<Route path="/admin" element={hasValidToken && CurrentUser.is_admin === true ? <Admin/> : <Navigate replace to="/login" />} />}
                    {<Route path="/profil/*" element={hasValidToken ? <Profil/> : <Navigate replace to="/login" />} />}
                    {<Route path="/setting/*" element={hasValidToken ? <Setting/> : <Navigate replace to="/login" /> } />}
                    {<Route path="/login" element={!hasValidToken ? <Login/> : <Navigate replace to="/" />} />}
                    {<Route path="*" element={hasValidToken ? <Navigate replace to="/" /> : <Navigate replace to="/login" />} />}
                </Routes>
            </UserContext.Provider>
        </Router>
    );
};

export default MyRoutes;