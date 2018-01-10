/**
 * Gets details of a dispatched call and dispatches to the redux store
 * @function getERS_DispatchDetails
 * @param { string } id
 */

import axios from 'axios';

export function getERS_DispatchDetails(id) {
  return function(dispatch) {
    var location = `https://gfd.dispatch.rustybear.com/api?code=${id}`;
    axios
      .get(location)
      .then(response => {
        dispatch({
          type: 'SET_CURRENT_DISPATCH',
          payload: response.data
        });
        return response;
      })
      .then(response => {
        const dispatchObj = response.data;
        const destinationLng = dispatchObj.longitude;
        const destinationLat = dispatchObj.latitude;
        const result = {
          destinationLat: parseFloat(destinationLat),
          destinationLng: parseFloat(destinationLng)
        };
        dispatch({
          type: 'SET_DESTINATION',
          payload: result
        });
      })
      .catch(err => {
        dispatch({
          type: 'SET_CURRENT_DISPATCH_FAILED',
          payload: err
        });
        console.log(err);
      });
  };
}
