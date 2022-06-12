import React, { useEffect, useState } from 'react';
import { instanceAxios } from '../api/Axios';
import {ImBin} from 'react-icons/im';
import jwt_decode from "jwt-decode";

const Admin = () => {

    const [UserData, setUserData] = useState([]);
    const [AdminData, setAdminData] = useState({});

    useEffect(() => {
   
        instanceAxios.get('/api/refresh')
        .then((res) =>  {
            const Admin = jwt_decode(res.data.accessToken);
            instanceAxios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`
            instanceAxios.get(`/api/admin/${Admin.id}`)
            .then(response => setAdminData(response.data));
            instanceAxios.get('/api/admin')
            .then(response => setUserData(response.data));
        })
        .catch(() => window.location.href = "/login");
    
      }, []);

      console.log(AdminData)

    const deleteUSer = (userID) => {
        instanceAxios.delete(`/api/admin/${userID}`)
        .then(() =>  {
            instanceAxios.get('/api/admin')
            .then(response => setUserData(response.data));
        });
    };

    const handleIsAdmin = (e, user) => {

        let admin_value = e.target.value;
        admin_value === 'true' ? admin_value = false : admin_value = true;

        instanceAxios({
            method: "PUT",
            url: `/api/admin/${user.id}`,
            data: {
                is_admin: admin_value
            },
        })
        .then((res) => {  
            instanceAxios.get('/api/admin')
            .then(response => setUserData(response.data));
        })

    }

    return (
        <div>
            <div className='adminPanel-Wrapper'>
                <div className='Asidebar'>

                </div>
                <div className='myTable'>
                    <div className='barTop'>

                    </div>
                    <table className='myTable-content'>
                        <thead>
                            <tr>
                                <th>Adresse Email</th>
                                <th>Mot de passe</th>
                                <th>Nom</th>
                                <th>Admin Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {UserData.map(User => <tr key={'UserData_' + User.id}>
                                <td key={'UserEmails_' + User.id}>{User.email}</td>
                                <td key={'UserPassword_' + User.id}>{User.password}</td>
                                <td key={'UserName_' + User.id}>{User.username}</td>
                                <td key={'UserIsAdmins_' + User.id}>
                                    <div className='switch-btn'>
                                        <label htmlFor={`buttonGroup${User.id}`}></label>
                                        <input onChange={(e) => handleIsAdmin(e, User)} id={`buttonGroup${User.id}`} type="checkbox" value={User.is_admin}/>
                                    </div>
                                </td> 
                                <td onClick={() => deleteUSer(User.id)}><ImBin/></td> 
                            </tr>
                            )}
                        </tbody>
                    </table >
                </div>
            </div>
        </div >
    );
};

export default Admin;