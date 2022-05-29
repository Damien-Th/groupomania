import React, { useEffect, useState } from 'react';
import axios from "axios"
const  URL_SERVER = process.env.REACT_APP_URL_SERVER;

const Admin = () => {

    const [UserData, setUserData] = useState([]);
    // const [checked, setChecked] = React.useState();

    const deleteUSer = (userID) => {
        axios.delete(`${URL_SERVER}/api/admin/${userID}`)
        .then(() =>  {
            axios.get(`${URL_SERVER}/api/admin`)
            .then(response => setUserData(response.data));
        });
    };

    const handleIsAdmin = (userID) => {
        axios.put(`${URL_SERVER}/api/admin/${userID}`, { "is_admin": true })
        .then(() =>  {
            axios.get(`${URL_SERVER}/api/admin`)
            .then(response => setUserData(response.data));
        });
    }

    useEffect(() => {
        axios.get(`${URL_SERVER}/api/admin`)
            .then(response => setUserData(response.data));
    }, []);

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
                                    <input onClick={() => handleIsAdmin(User.id)} type="checkbox" checked={User.is_admin ?  'checked' : ''}/>
                                </td> 
                                <td onClick={() => deleteUSer(User.id)}>Supprimer</td> 
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