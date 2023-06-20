import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Bookingadm from "./Bookingadm.js";
import Homeadm from "./Homeadm.js";
import SideAdm from "./SideAdm.js";
import Usersadm from "./Usersadm.js";
import Roomsadm from "./Roomsadm.js";

function AdminScreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        <div className="col-2 bg-white vh-100">
          <SideAdm/>
        </div>
        <div className="col-auto">
          <Homeadm/>

        </div>
      </div>
    </div>
  );
}

export default AdminScreen;
