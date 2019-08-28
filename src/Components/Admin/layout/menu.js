import React from 'react';
import { Route, Link } from 'react-router-dom'
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
  }
  showDropdown(e) {
    e.preventDefault();
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }



render() {
  const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? ' show' : '')
  const NavItem = props => {
  const pageURI = window.location.pathname;
  console.log(pageURI);
  console.log(props.path);
  }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="nav-link" to="/dashboard">Dashboard</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
          <Link className="nav-link" to="/userlist">User</Link>
           
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/countrylist">Country</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => {this.showDropdown(e)}}>
              Dropdown
            </a>
            <div className={classDropdownMenu} aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">Action</a>
              <a className="dropdown-item" href="/">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/">Something else here</a>
            </div>
          </li>
         
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
      
    );
  }
}
export default Menu
