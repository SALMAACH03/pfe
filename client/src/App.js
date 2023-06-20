import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter ,Routes, Route , Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import profileScreen from './screens/profileScreen';
import adminScreen from './screens/adminScreen';
import Bookingadm from './screens/Bookingadm';
import Roomsadm from './screens/Roomsadm';
import Usersadm from './screens/Usersadm';
import AdmAddRoom from './screens/AdmAddRoom';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <BrowserRouter>
    <Routes>
    <Route path='/home' exact Component={HomeScreen}/>
    <Route path='/book/:roomid/:fromdate/:todate' exact Component={BookingScreen}/>
    <Route path='/register' exact Component={RegisterScreen}/>
    <Route path='/login' exact Component={LoginScreen}/>
    <Route path='/profile' exact Component={profileScreen}/>
    <Route path='/admin' exact Component={adminScreen}/>
    <Route path='/Bookingadm' exact Component={Bookingadm}/>
    <Route path='/Roomsadm' exact Component={Roomsadm}/>
    <Route path='/Usersadm' exact Component={Usersadm}/>
    <Route path='/AddRoomadm' exact Component={AdmAddRoom}/>
    <Route path='/' exact Component={Landingscreen}/>
    </Routes>
      
    </BrowserRouter>

    </div> 
  );
}

export default App;
