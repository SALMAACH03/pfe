import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';
import Error from '../component/Error';
import SideAdm from './SideAdm';

function Roomsadm() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/rooms/getallrooms');
        const data = response.data;
        setRooms(data);
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
        <div className="Roomstable">
          <div className="col-md-10 ">
            {loading && <Loader />}
            <table className="table table-striped ">
              <thead className="bs">
              <tr>
                <th scope="col">Room ID</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Rent Per Day</th>
                <th scope="col">Max Count</th>
                <th scope="col">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
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

export default Roomsadm;
