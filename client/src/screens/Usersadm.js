import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../component/Loader';
import Error from '../component/Error';
import SideAdm from './SideAdm';

function Usersadm() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/users/getallusers');
        const data = response.data;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }

    fetchData();
  }, []);

  return (
 <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        <div className="col-2 bg-white vh-100">
          <SideAdm />
        </div>
        <div className="col-auto">
          <div className="Userstable">
            <div className="col-md-10">
              {loading && <Loader />}
              <table className="table table-striped">
                <thead className="bs">
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Usersadm;
