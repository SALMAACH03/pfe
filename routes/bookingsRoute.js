const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const Booking = require('../models/booking');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')("sk_test_51NDVtJGSz8i6bui6UVgezxIzjYGvP85gu5mpIXxVg8mGCAMBzKAdjDHzjKTFL7GU1OBTwbpUMVGy4KZA3Gl39vLN00U4Mp0B1L");

router.post('/bookroom', async (req, res) => {
  try {
    const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;
    console.log(req.body)
    console.log('Token:', token);

    if (!token || !token.email || !token.id) {
      throw new Error('Invalid token data');
    }

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: 'USD',
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4()
      }
    );

    if (payment) {

    

      const newBooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        transactionId:'1234'
      });

      const booking = await newBooking.save();

      const roomtemp = await Room.findOne({ _id: room._id });
      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate,
        todate,
        userid,
        status: booking.status
      });

      await roomtemp.save();

      console.log('Payment Successful');
      res.send('Payment Successful, Your Room is Booked');
    } else {
      throw new Error('Payment failed');
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(400).json({ error: error.message });
  }
});
router.post('/getbookingsbyuserid',async(req,res)=>{ 
  const userid=req.body.userid
  try {
    const bookings=await Booking.find({userid:userid})
    res.send(bookings)

  } catch (error) {
    return res.status(400).json({error})
  }
})
router.post("/cancelbooking",async(req,res)=>{ 
  const {bookingid,roomid}=req.body
  try {
    const bookingItem=await Booking.findOne({_id:bookingid})
    bookingItem.status='cancelled'
    await bookingItem.save()
    const room =await Room.findOne({_id:roomid})
    const bookings=room.currentbookings
    const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
    room.currentbookings=temp 
    await room.save()
    res.send('your booking cancelled successfully')
  } catch (error) {
    return res.status(400).json({error})
  }
})
router.get('/getallbookings',async(req,res)=>{ 
  try {
    const bookings= await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({error})
  }
})

module.exports = router;
