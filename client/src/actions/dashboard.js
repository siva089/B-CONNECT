import { DATA_LOADED, DATA_FAILED } from "./types";
import axios from "axios";
export const dashboard = ( country ) => async dispatch => {
 

  try {
    const res = await axios.get(
      `http://localhost:5000/api/company/country?location=${country}`,
     
    );

    

    dispatch({
      type: DATA_LOADED,
      payload: res.data
    });
    
  } catch (err) {
    dispatch({
      type: DATA_FAILED
    });
  }
};
