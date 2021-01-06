import React from "react";

const Navbar = () => {
    return <nav className="navbar navbar-expand-md navbar-light fixed-top" id="bar">
    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
      <span className="navbar-toggler-icon"> </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav">
        <h2> DashBoard Application</h2>
      </div>
    </div>
  </nav>
}

export default Navbar;