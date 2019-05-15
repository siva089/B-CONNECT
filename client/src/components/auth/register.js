import React, { Fragment, useState } from "react";
import { Link,Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';
import Alert from '../layout/alert';
import {register} from '../../actions/auth'


const Register = (props) => {
  const {setAlert,register,isAuthenticated}=props
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    country: ""
  });
  const { name, email, password, password2, country } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
     setAlert("passwords does't match",'danger')
    } else {
    register({name,email,password,country})
    }
  };
if(isAuthenticated){
  return <Redirect to='/home' />
}

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary login-media">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <Alert />
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              // required
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              // required
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              // required
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              // required
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <select
              value={country}
              name="country"
              // required
              onChange={e => onChange(e)}
            >
              <option disabled>Select your Country</option>
              <option value="USA">USA</option>
              <option value="INDIA">INDIA</option>
              <option value="CHINA">CHINA</option>
              <option value="JAPAN">JAPAN</option>
              <option value="ENGLAND">ENGLAND</option>
              <option value="BRAZIL">BRAZIL</option>
              <option value="AUSTRALIA">AUSTRALIA</option>
              <option value="SOUTHAFRICA">SOUTHAFRICA</option>
              <option value="SWITZERLAND">SWITZERLAND</option>
              <option value="RUSSIA">RUSSIA</option>
            </select>
            <small>select your country from above</small>
          </div>

          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
Register.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
}
export default connect(mapStateToProps,{setAlert,register})(Register);
