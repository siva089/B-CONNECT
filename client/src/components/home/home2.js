import React,{useState,useEffect} from 'react';
import {setAlert} from '../../actions/alert'

import axios from 'axios'

const Home2 = (props) => {
 
const data = props.location.state; 


 
 const [formData,setFormData]=useState({
name:'',
email:'',
regarding:'',
textarea:'',

 })
 const {name,email,regarding,textarea}=formData
   const onChange = e =>
     setFormData({ ...formData, [e.target.name]: e.target.value });
   const onSubmit = async e => {
     e.preventDefault();
    
     const config = {
       headers: {
         "Content-Type": "application/json"
       }
     };
      const body = JSON.stringify({ name, email,regarding,textarea });
     await axios.post('/api/users/data',body,config);
     setFormData({
       name:'',
       email:'',
       regarding:'',
       textarea:''
     })
     props.history.push(`/home`);

    
   };

    return (
      <div className="home-2">
        <h1 className="home2-header">{data.companies.company}</h1>
        <div className="home2-info">
          <p>
            {" "}
            <span>About Us</span>: {data.companies.description}
          </p>
          <div className="home2-flex">
            <div>
              <p>
                <span>EstablishedOn</span>:{data.companies.establishedOn}
              </p>
              <p>
                <span>Location:</span>
                {data.companies.location}
              </p>
            </div>
            <div>
              <p>
                <span>Employees:</span>
                {data.companies.employees}
              </p>
              <p>
                <span>Revenue:</span>
                {data.companies.revenue}
              </p>
            </div>
          </div>
        </div>
        <h1 className='home2-h9'>Contact Us</h1>

        <div className="contactus">
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
                type="text"
                placeholder="Regarding information"
                name="regarding"
                value={regarding}
                // required
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <textarea rows="6" cols="50"
                type="textarea"
                placeholder="convey your request"
                name="textarea"
                value={textarea}
                // required
                onChange={e => onChange(e)}
              />
            </div>

            <input
              type="submit"
              className="btn btn-primary"
              value="Contact Us"
            />
          </form>
        </div>
      </div>
    );
}

export default Home2
