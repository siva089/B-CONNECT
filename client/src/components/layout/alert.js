import React,{Fragment} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

const alert = ({alerts}) => {
  return (
    <Fragment>
    {
      alerts !==null && alerts.length>0 && alerts.map(alert=>(
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.msg}
          </div>
      ))
    }
    </Fragment>
  );
}

alert.propTypes = {
alerts:PropTypes.array.isRequired,
}
const mapStateToProps=state=>({
alerts:state.alert
})
export default connect(mapStateToProps)(alert)
