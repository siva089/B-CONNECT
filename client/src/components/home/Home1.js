import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { dashboard } from "../../actions/dashboard";
import Loader from 'react-loader-spinner'

import axios from "axios";

class Home1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      intrestedCompanies: [],

      myCountry: this.props.myCountry,
      country: this.props.location.state.country,
      loading: this.props.loading,
      on: true
    };
  }
  onSubmit1 = () => {
    this.setState({
      on: true
    });
  };
  onSubmit2 = () => {
    this.setState({
      on: false
    });
  };

  async componentDidMount() {
    this.props.dashboard(this.props.location.state.country);
    const myCountry = this.state.myCountry;

    const res = await axios.get(
      `/api/company/extending?location=${
        this.state.country
      }&myCountry=${myCountry}`
    );
    const res1 = await axios.get(
      `/api/company/providing?location=${
        this.state.country
      }&myCountry=${myCountry}`
    );

    const datap = res1.data;
    this.setState({ intrestedCompanies: datap });

    const dataIs = res.data;

    this.setState({ companies: dataIs });
  }

  render() {
    const listItems = this.state.intrestedCompanies.map(c => (
      <Link
        to={{
          pathname: "/home2",
          state: {
            companies: c
          }
        }}
        key={c.company}
        className="card"
      >
        <div className="home-box">
          <h1>{c.company}</h1>
          <p className="service">services</p>
          {c.servicesProvided.map(a => {
            return <li className="services">{a}</li>;
          })}

          <div className="home-bottom">
            <p className="home-box__date">
              Establishedon:{c.establishedOn}
            </p>
            <p className="home-box__revenue">Revenue:{c.revenue}</p>
          </div>
        </div>
      </Link>
    ));

    //////////

    const listedItems = this.state.companies.map(c => (
      <Link
        to={{
          pathname: "/home2",
          state: {
            companies: c
          }
        }}
        key={c.company}
        className="card"
      >
        <div className="home-box">
          <h1>{c.company}</h1>
          <p className='service'>services</p>
          {c.servicesProvided.map(a=>{
            return <li className="services">{a}</li>; 
          })}

          <div className="home-bottom">
            <p className="home-box__date">Establishedon:{c.establishedOn}</p>
            <p className="home-box__revenue">Revenue:{c.revenue}</p>
          </div>
        </div>
      </Link>
    ));
    ///
const isLoading =
  listedItems.length === 0 ? (
    <div className="loader">
      <Loader type="TailSpin" color="#00BFFF" height="50" width="50" />
      no companies are intrested
    
     
    </div>
  ) : (
    listedItems
  );
const loading =
  listItems.length === 0 ? (
    <div className="loader">
      <Loader
        className="loader"
        type="TailSpin"
        color="#00BFFF"
        height="50"
        width="50"
      />
      {setTimeout(function() {
        return <h1>No companies are providing services</h1>;
      }, 3000)}
    </div>
  ) : (
    listItems
  );

    const dynamic = this.state.on
      ? "offering services to  "
      : "that are intrested to partner with ";

    return (
      <div className="b-g">
        <div id="divi">
          <button
            className={"btn home-btn " + (this.state.on ? "btn-primary" : "nothing")}
            onClick={this.onSubmit1}
          >
            Companies that are providing services to {this.state.myCountry}{" "}
          </button>
          <button
            className={"btn " + (!this.state.on ? "btn-primary" : "nothing")}
            onClick={this.onSubmit2}
          >
            Companies that are intrested to partner with {this.state.myCountry}
          </button>
        </div>
        <h1 className="header">
          Companies {dynamic} {this.state.myCountry}
        </h1>

        <div id="home1-flex">{this.state.on ?isLoading:loading}</div>
      </div>
    );
  }
}
// Home1.propTypes = {
//   dashboard: PropTypes.func.isRequired,
//   data:PropTypes.array.isRequired,
// };
const mapStateToProps = state => {
  if (state.auth.loading) {
    return { myCountry: "" };
  }

  return {
    data: state.dashboard.data,
    myCountry: state.auth.user.country,
    loading: state.auth.loading
  };
};

export default connect(
  mapStateToProps,
  { dashboard }
)(Home1);
