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
import { instanceAxios } from '../../api/Axios';

const MyRoutes = () => {

    const [CurrentUser, setCurrentUser] = useState(null);
    const [hasValidToken, setHasValidToken] = useState(null);

    useEffect(() => {

        if(window.location.pathname !== '/login' && window.location.pathname !== '/login/') {
            instanceAxios.get('/api/auth/refresh')
            .then(res => {
                const UserId = jwt_decode(res.data.accessToken).id
                instanceAxios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`
                instanceAxios.get(`/api/user/${UserId}`)
                .then(res => {
                    setHasValidToken(true)
                    setCurrentUser(res.data)
                })
            })
            .catch(() => setHasValidToken(false));
        }else {
            setHasValidToken(false)
        }

    }, [setHasValidToken, setCurrentUser]);

    if(hasValidToken === null) { return (<div className='loader'></div>) }

    return (
        <Router>
            <UserContext.Provider value={{CurrentUser, setCurrentUser, hasValidToken, setHasValidToken}}>
                <Routes>
                    {<Route path="/" element={hasValidToken ? <Home/> : <Navigate replace to="/login" />} />}
                    {<Route path="/logout" element={hasValidToken ? <Logout/> : <Navigate replace to="/login" />} />}
                    {<Route path="/admin" element={hasValidToken ? <Admin/> : <Navigate replace to="/login" />} />}
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