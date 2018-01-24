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
        // If there is a lat and long from Dispatch then:
        if (dispatchObj.longitude !== '') {
          const destinationLng = dispatchObj.longitude;
          const destinationLat = dispatchObj.latitude;
        } else {
          const streetNumber = dispatchObj.streetnumber;
          const streetName = dispatchObj.streetname;
					const city = dispatchObj.city;  // TODO: check for OLD G'WCH and other odd variants
          const googleApiAddress = `https://maps.google.com/maps/api/geocode/json?address=${streetNumber}+${streetName}+${city}`;
          axios.get(googleApiAddress).then(response => {
            const destinationLat = response.data.results[0].geometry.location.lat;
            const destinationLng = response.data.results[0].geometry.location.lng;
        } // end else
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
