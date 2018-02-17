/**
 * Gets details of a dispatched call and dispatches to the redux store
 * @function getERS_DispatchDetails
 * @param { string } id
 */

import axios from 'axios'

export function getERS_DispatchDetails(id) {
  return function(dispatch) {
    var location = `https://gfd.dispatch.rustybear.com/api?slug=${id}`
    // var dispatchObj
    axios.get(location)
      .then(response => {
        const dispatchObj = response.data.Items[0]
        dispatch({
          type: 'SET_CURRENT_DISPATCH',
          // payload: response.data.Items[0]
          payload: dispatchObj
        })
        return { dispatchObj: dispatchObj }
      })
      .then(async response => { // might have to wait for Google geocode
        var destinationLng = 0
        var destinationLat = 0
        // If there is a lat and long from Dispatch then use them ...
        if (response.dispatchObj.latitude !== '') {
          // set destination using long/lat
          destinationLng = response.dispatchObj.longitude
          destinationLat = response.dispatchObj.latitude
        } else {
          // ... otherwise have Google get the lat/long from the address
          const locate = response.dispatchObj.location
          const city = response.dispatchObj.city
          const googleApiAddress = `https://maps.google.com/maps/api/geocode/json?address=${locate}+${city}+CT&key=AIzaSyDaIBXGdwp9ItpY-lA_rLk7cJ35jorY18k`
          await axios.get(googleApiAddress) // this geocode call is what we're waiting for ...
            .then(response => {
              if (response.data.status !== 'ZERO_RESULTS') {
                destinationLat = response.data.results[0].geometry.location.lat
                destinationLng = response.data.results[0].geometry.location.lng
              } else {
                console.log('WARNING: Zero results from Google Geocode')
              }
            })
            .catch(err => {
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
