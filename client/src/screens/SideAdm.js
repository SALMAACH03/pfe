// SideAdm.js
import React from "react";

function SideAdm() {
  return (
    <div className="bg-white sidebar p-2 m-2">
      <div className="list-group list-group-flush">
        {/* Link 1 */}
        <a className="list-group-item list-group-item-action py-2 my-1" href="/Bookingadm">
          <i className="bi bi-table fs-5 me-3"></i>
          <span className="fs-5">Bookings</span>
        </a>

        {/* Link 2 */}
        <a className="list-group-item list-group-item-action py-2 my-1" href="/Roomsadm">
          <i className="bi bi-building fs-5 me-3"></i>
          <span className="fs-5">Rooms</span>
        </a>

        {/* Link 3 */}
        <a className="list-group-item list-group-item-action py-2 my-1" href="/AddRoomadm">
          <i className="bi bi-building-add fs-5 me-3"></i>
          <span className="fs-5">Add Room</span>
        </a>

        {/* Link 4 */}
        <a className="list-group-item list-group-item-action py-2 my-1" href="/Usersadm">
          <i className="bi bi-people fs-5 me-3"></i>
          <span className="fs-5">Users</span>
        </a>
      </div>
    </div>
  );
}

export default SideAdm;
