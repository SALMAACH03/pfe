import React from 'react'
import { Link } from 'react-router-dom';

function Landingscreen() {
  return (
    <div className='row landing'>
        <div className='col-md-12 text-center'>
            <h2 style={{color:'white',marginTop:'16px',fontSize:'130px'}}>Kira2</h2>
            <h1 style={{color:'white' ,marginTop:'-16px'}}>Discover a world of exceptional hotels and book your stay effortlessly with KIRA2.</h1>
            <Link to='/home'>
            <button className='btn' style={{fontSize:'22px',color:'black',fontWeight:'bold',fontFamily:'Dancing Script',backgroundColor:'white',marginTop:'12%',width:'30%'}}>Get Started</button>
            </Link>
        </div>
    </div>
  )
}

export default Landingscreen