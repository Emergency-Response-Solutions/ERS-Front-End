/**
 * Gets details of a dispatched call and dispatches to the redux store
 * @function getERS_DispatchDetails
 * @param { string } id
 */

import axios from 'axios'

export function getERS_DispatchDetails (id) {
  return function (dispatch) {
    var location = `https://gfd.dispatch.rustybear.com/api?code=${id}`
    axios.get(location)
      .then(response => {
        dispatch({
          type: 'SET_CURRENT_DISPATCH',
          payload: response.data
        })
        return response
      })
      .then(async response => { // might have to wait for Google geocode
        const dispatchObj = response.data
        // If there is a lat and long from Dispatch then use them:
        var destinationLng = 0
        var destinationLat = 0
        if (dispatchObj.latitude !== '') {
          destinationLng = dispatchObj.longitude
          destinationLat = dispatchObj.latitude
        } else { // otherwise have Google get the lat/long from the address
          var locate = dispatchObj.location
	  const city = dispatchObj.city
          const googleApiAddress = `https://maps.google.com/maps/api/geocode/json?address=${locate}+${city}+CT&key=AIzaSyDaIBXGdwp9ItpY-lA_rLk7cJ35jorY18k`
            console.log(googleApiAddress);
          await axios.get(googleApiAddress) // this geocode call is what we're waiting for ...
            .then(response => {
              if (response.data.status !== 'ZERO_RESULTS') {
                destinationLat = response.data.results[0].geometry.location.lat
                destinationLng = response.data.results[0].geometry.location.lng
              } else {
                console.log('ERROR: Zero results from Google Geocode');
              }
            })
            .catch (err => {
              console.log(err)
            })
        } // end else
        const result = {
          destinationLat: parseFloat(destinationLat),
          destinationLng: parseFloat(destinationLng)
        }
        dispatch({
          type: 'SET_DESTINATION',
          payload: result
        })
      })
      .catch(err => {
        dispatch({
          type: 'SET_CURRENT_DISPATCH_FAILED',
          payload: err
        })
        console.log(err)
      })
  }
}
