import React, { Fragment, useState } from "react";

import { dashboard } from "../../actions/dashboard";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Home = props => {
  const [formData, setFormData] = useState({
    country: "USA"
  });

  const { country } = formData;
  const { dashboard } = props;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
  
 

    props.history.push(`/home1`,{country:country});

    
  };

  return (
    <Fragment>
      <div className="home-header">
        <h1>WELCOME TO BCONNECT </h1>
        <p>A one place solution for your bussiness extension</p>
      </div>

      <h2>Select country</h2>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="country" required onChange={e => onChange(e)}>
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
        </div>
        <input type="submit" className="btn btn-primary" value="Check" />
      </form>
    </Fragment>
  );
};

Home.propTypes = {
  dashboard: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return { data: state.dashboard.data };
};

export default  connect(
  mapStateToProps,
  { dashboard }
)(Home);
