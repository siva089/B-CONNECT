import React from 'react'

const Home2 = (props) => {
 const data=props.location.state
 console.log(data);
    return (
      <div>
        <h1>{data.companies.company}</h1>
        <p>{data.companies.description}</p>
        <p>{data.companies.establishedOn}</p>
        <p>{data.companies.location}</p>
        <p>{data.companies.employess}</p>
        <p>{data.companies.revenue}</p>
        <p>{data.companies.website}</p>
        {data.companies.intrestedIn.map(c => (
          <div>
            <li>{c}</li>
          </div>
        ))}
        {data.companies.offeringServices.map(c => (
          <div>
            <li>{c}</li>
          </div>
        ))}
      </div>
    );
}

export default Home2
