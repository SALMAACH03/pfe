import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../component/Loader';
import Error from '../component/Error';
import SideAdm from './SideAdm';

function Bookingadm() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/bookings/getallbookings');
        const data = response.data;
        setBookings(data);
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
          <div className="table1">
            <div className="col-md-10 ">
              {loading && <Loader />}
              <table className="table table-striped">
                <thead className="bs">
                  <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Room</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 &&
                    bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking._id}</td>
                        <td>{booking.userid}</td>
                        <td>{booking.room}</td>
                        <td>{booking.fromdate}</td>
                        <td>{booking.todate}</td>
                        <td>{booking.status}</td>
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

export default Bookingadm;
