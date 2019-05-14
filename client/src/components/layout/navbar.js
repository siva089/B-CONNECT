import React, { Fragment } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const authLinks=(<ul>
          <li>
           <Link onClick={logout} to='/'>Logout</Link>
          </li>
         
        </ul>)
const guestLinks=( <ul>
          <li>
            <Link to="/companies">Companies</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>)

  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/home">
            <i className="fas fa-code"/> B Connect
          </Link>
        </h1>
        {!loading && (<Fragment>{isAuthenticated ? authLinks:guestLinks}</Fragment>)}
       
      </nav>
    </Fragment>
  );
};
Navbar.propTypes={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{logout})(Navbar);
