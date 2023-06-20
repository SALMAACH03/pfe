import React, { useEffect, useState } from 'react';
import { Tabs,Tag,Divider } from 'antd';
import axios from 'axios';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Swal from 'sweetalert2';

const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className='tab'>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Profile' key='1'>
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h1>
        </TabPane>
        <TabPane tab='Bookings' key='2'>
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
        const data = await response.data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchData();
  }, []);
 async function cancelBooking(bookingid,roomid){ 
try {
  setLoading(true)
  const result=await (await axios.post("/api/bookings/cancelbooking",{bookingid,roomid})).data
  console.log(result)
  setLoading(false)
  Swal.fire('Congrats','Your booking has been cancelled','success').then(result=>{ 
    window.location.reload()
  })
} catch (error) {
console.log(error)
setLoading(false)  
Swal.fire('Oops','Something went wrong','error')
}
 }
  return (
    <div className='row'>
      <div className='col-md-6'>
        {loading && <Loader />}
        {bookings &&
          bookings.map(booking => (
            <div key={booking._id} className='book'>
              <h1>{booking.room}</h1>
              <p>
                <b>BookingId</b>:{booking._id}
              </p>
              <p>
                <b>CheckIn</b>:{booking.fromdate}
              </p>
              <p>
                <b>CheckOut</b>:{booking.todate}
              </p>
              <p>
                <b>Amount</b>:{booking.totalamount}
              </p>
              <p>
  <b>Status</b>: {booking.status === 'cancelled' ? <Tag color='red'>CANCELLED</Tag> : <Tag color='green'>CONFIRMED</Tag>}
</p>

              { 
              booking.status!=='cancelled' &&(
                <div className='text-right'>
              <button className='btn btn-primary'onClick={()=>{ cancelBooking(booking._id,booking.roomid)}}>CANCEL BOOKING</button>
              </div>
              )
              }
            </div>
          ))}
      </div>
    </div>
  );
}
