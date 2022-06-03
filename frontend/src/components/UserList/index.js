import React, {useState, useEffect} from 'react';
import { instanceAxios } from '../../api/Axios';

const UserList  = () => {

  const [persons, setPersons] = useState([]);

  useEffect(() => {
      instanceAxios.get("/api/user")
      .then(res => {
      setPersons(res.data);
    })
  }, []);

    return (
      <ul>
        { persons.map(person => <li key={person.email}>{person.email}</li>)}
      </ul>
    )
  
}

export default UserList;