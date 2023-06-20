import React, { useState } from 'react';
import SideAdm from './SideAdm';
import Loader from '../component/Loader';
import axios from 'axios';
import Swal from 'sweetalert2';
function AdmAddRoom() {
    const [name,setName]=useState('')
    const [rentperday,setRentperday]=useState()
    const [maxcount,setMaxcount]=useState()
    const [description,setDescription]=useState()
    const [phonenumber,setPhonenumber]=useState()
    const [type,setType]=useState()
    const [imageurl1,setImageurl1]=useState()
    const [imageurl2,setImageurl2]=useState()
    const [imageurl3,setImageurl3]=useState()
    const [loading, setLoading] = useState(false);

async function addRoom(){ 
    const newroom={
        name,
        rentperday,
        maxcount,
        description,
        phonenumber, 
        type,
        imageurls:[imageurl1,imageurl2,imageurl3]
    }
try {
    setLoading(true)
    const result=await(await axios.post('/api/rooms/addroom',newroom)).data
    console.log(result )
    setLoading(false)
    Swal.fire('Congrats','Your new room added successfully','success').then(result=>{ 
        window.location.href='/home'
    })
} catch (error) {
    console.log(error)
    setLoading(false)
    Swal.fire('OOps','something went wrong','error')
}
}



  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row ">
        <div className="col-2 bg-white vh-100">
          <SideAdm />
        </div>
        <div className="col ">
          <div className="row justify-content-center ">
          
            <div className="col-md-5 p-5 bs">
            {loading && <Loader/>}
              <form>
                <div className="form-group">
                  <label htmlFor="roomName">Room Name</label>
                  <input type="text" className="form-control mb-2" id="roomName" placeholder="Room Name" 
                  value={name} onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rentPerDay">Rent per Day</label>
                  <input type="text" className="form-control mb-2" id="rentPerDay" placeholder="Rent per Day" 
              value={rentperday} onChange={(e)=>setRentperday(e.target.value)}

                  />
                </div>
                <div className="form-group">
                  <label htmlFor="maxCount">Max Count</label>
                  <input type="text" className="form-control mb-2" id="maxCount" placeholder="Max Count" 
                  
                  value={maxcount} onChange={(e)=>setMaxcount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control mb-2" id="description" placeholder="Description" 
                                value={description} onChange={(e)=>setDescription(e.target.value)}

                  />
                </div>
              </form>
            </div>
            <div className="col-md-5 p-5 bs">
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" className="form-control mb-2" id="phoneNumber" placeholder="Phone Number" 
                              value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}

                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input type="text" className="form-control mb-2" id="type" placeholder="Type" 
                              value={type} onChange={(e)=>setType(e.target.value)}


                />
              </div>
              <div className="form-group">
                <label htmlFor="image1">Image URL 1</label>
                <input type="text" className="form-control mb-2" id="image1" placeholder="Image URL 1" 
                              value={imageurl1} onChange={(e)=>setImageurl1(e.target.value)}

                />
              </div>
              <div className="form-group">
                <label htmlFor="image2">Image URL 2</label>
                <input type="text" className="form-control mb-2" id="image2" placeholder="Image URL 2" 
                              value={imageurl2} onChange={(e)=>setImageurl2(e.target.value)}


                />
              </div>
              <div className="form-group">
                <label htmlFor="image3">Image URL 3</label>
                <input type="text" className="form-control mb-2" id="image3" placeholder="Image URL 3" 
                              value={imageurl3} onChange={(e)=>setImageurl3(e.target.value)}

                />
              </div>
            </div>
            <div className="col-12 text-center">
              <button className="btn btn-primary mt-3 p-3" onClick={addRoom}>Add Room</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmAddRoom;
