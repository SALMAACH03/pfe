import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../component/Room';
import Loader from '../component/Loader';
import Error from '../component/Error';
import moment from 'moment';

import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [duplictaerooms, setDuplictaerooms] = useState([]);
const[searchkey,setSearchkey]=useState("")
const[type,setType]=useState("all")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/rooms/getallrooms');
        const data = response.data;
        setRooms(data);
        setDuplictaerooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    setFromdate(dates[0]?.format('D-M-YYYY'));
    setTodate(dates[1]?.format('D-M-YYYY'));
    var temprooms = [];

    for (const room of duplictaerooms) {
      var availability = false;

      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            moment(dates[0]?.format('D-M-YYYY')).isBetween(booking.fromdate, booking.todate) ||
            moment(dates[1]?.format('D-M-YYYY')).isBetween(booking.fromdate, booking.todate) ||
            moment(booking.fromdate).isBetween(dates[0], dates[1]) ||
            moment(booking.todate).isBetween(dates[0], dates[1])
          ) {
            availability = true;
          }
        }
      }

      if (availability || room.currentbookings.length === 0) {
        temprooms.push(room);
      }
    }

    setRooms(temprooms);
  }
function filterBySearch(){ 
const temprooms=duplictaerooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
setRooms(temprooms)
}
function filterByType(e){ 
  setType(e)
if(e!=='all'){
  const temprooms=duplictaerooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
setRooms(temprooms)
}else{ 
  setRooms(duplictaerooms)
}
}
  return (
    <div className='container'>
      <div className='row mt-5 bs'>
        <div className='col-md-3 '>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
        <div className='col-md-5'>
<input type='text' className='form-control' placeholder='search rooms'
value={searchkey} onChange={(e)=>{setSearchkey(e.target.value)}} onKeyUp={filterBySearch}
/>
        </div>
       <div className='col-md-3'>
       <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">All</option>
          <option value="delux">Delux</option>
          <option value="non-delux">Non-Delux</option>
        
        </select>
       </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (
          <Loader key='loader' />
        ) :  (
          rooms.map((room) => (
            <div className='col-md-9 mt-3' key={room.id}>
              <Room room={room} key={room.id} fromdate={fromdate} todate={todate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
