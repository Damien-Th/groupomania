import React, { useEffect } from 'react';
import { instanceAxios } from '../api/Axios';
// import UserList from '../components/UserList';


const Profil  = () => {

    useEffect(() => {
   
        instanceAxios.get('/api/refresh')
        .then(res =>  res.data)
        .catch(() => window.location.href = "/login");
    
      }, []);


    return (
        <div className='profil-page'>
           hello profil
           {/* <UserList></UserList> */}
        </div>
    );
};

export default Profil;