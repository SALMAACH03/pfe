import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../component/Loader';
import Error from '../component/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
function BookingScreen() {
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
   if(!localStorage.getItem('currentUser')){
    window.location.href='/login'
   }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/rooms/getroombyid', {
          roomid
        });
        const data = response.data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [roomid]);

  // Calculate total days using Moment.js duration
  const fromDateObj = moment(fromdate, 'DD-MM-YYYY');
  const toDateObj = moment(todate, 'DD-MM-YYYY');
  const totalDays = room ? toDateObj.diff(fromDateObj, 'days') : 0;
  const totalAmount = room ? totalDays * room.rentperday : 0;

  function onToken(token) {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount: totalAmount,
      totaldays: totalDays,
      token
    };
setLoading(true)
    axios
      .post('/api/bookings/bookroom', bookingDetails)
      .then(response => {
        // Handle the success response from the server
        console.log('Booking successful');
        setLoading(false)
        Swal.fire('Congratulations','Your Room Booked Succcessfully','success').then(result=>{
          window.location.href='/profile'
        })
      })
      .catch(error => {
        // Handle the error response from the server
        setLoading(false)

        Swal.fire('Opss','Something went wrong','error')
      });
  }

  return (
    <div>
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : room ? (
        <div className='m-5'>
          <div className='row justify-content-center mt-5 bs'>
            <div className='col-md-6'>
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className='bigimg' />
            </div>
            <div className='col-md-6'>
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days: {totalDays}</p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total Amount: {totalAmount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <StripeCheckout
                  amount={totalAmount * 100}
                  token={onToken}
                  currency='USD'
                  stripeKey='pk_test_51NDVtJGSz8i6bui6xBHokQGwmhkTd6BWSQFokrJKhliVqQqUwvAG0ReqA5fcpLo3rnEdcmUCo1O3r3SPtQH9qhic00o9D3YB6L'
                >
                  <button className='btn btn-primary'>Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <h1>
          <Error />
        </h1>
      ) : null}
    </div>
  );
}

export default BookingScreen;
