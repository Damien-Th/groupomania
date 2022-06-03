// import React from 'react';
// import UserList from '../components/UserList';

import React, {useEffect} from 'react';
import instanceAxios from '../api/Axios';

const Profil  = () => {

useEffect(() => {
   
    instanceAxios.get('/api/refresh')
    .then(res =>  res.data);

}, []);
    return (
        <div className='profil-page'>
           hello profil
           {/* <UserList></UserList> */}
        </div>
    );
};

export default Profil;