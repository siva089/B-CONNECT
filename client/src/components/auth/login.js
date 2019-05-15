import React, { Fragment, useState } from "react";
import { Link,Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import Alert from '../layout/alert'



const Login = ({login,isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
login(email,password)
    
  };
//Redirect if logged in

if(isAuthenticated){
  return <Redirect to="/home" />
}
return (
  <Fragment>
    <section className="container">
      <h1 className="large text-primary login-media">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign into Your Account
      </p>
      <Alert/>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            required
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
            value={password}
            onChange={e => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login " />
      </form>
      <p className="my-1">
        create an account? <Link to="/register">sign up</Link>
      </p>
    </section>
  </Fragment>
)
}
Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}
const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login);
