import React from 'react'

function Navbar() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    function logout(){ 
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg  ">
            <a className="navbar-brand" href="/">
  <img src="https://api.logo.com/api/v2/images?logo=logo_31654ee1-b72d-4349-bd29-ded9261545ce&format=webp&margins=0&quality=60&width=500&background=transparent&u=1687036553" alt="logo" className="navimg" />
</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" ><i class="fa-solid fa-bars" style={{color:"black"}}> </i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ">
                        {user ? (
                            <>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" style={{backgroundColor:"white",color:'black',fontSize:'20px'}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className='fa fa-user'style={{color:"black" ,fontSize:'20px'}}></i>{user.name}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {user.isAdmin &&(
                                             <a className="dropdown-item" href="/admin">dashboard</a>
                                        )}
                                        <a className="dropdown-item" href="/profile">Profile</a>
                                        <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/register"> Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar