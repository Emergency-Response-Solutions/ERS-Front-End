import axios from 'axios';

export function getERS_DispatchDetails(id) {
  return function(dispatch) {
    var location = `https://gfd.dispatch.rustybear.com/api?code=${id}`;
    console.log(location);
    axios
      .get(location)
      .then(response => {
        dispatch({ type: 'SET_CURRENT_DISPATCH', payload: response.data });
        console.log(response.data);
        return response;
      })
      .then(response => {
        const dispatchObj = response.data;
        // const streetNumber = dispatchObj.streetnumber;
        // const streetName = dispatchObj.streetname;
        const destinationLng = dispatchObj.longitude;
        const destinationLat = dispatchObj.latitude;
        // const district = dispatchObj.district;
        // const googleApiAddress = `https://maps.google.com/maps/api/geocode/json?latlng=${latitude}+${longitude}`;
        // axios.get(googleApiAddress).then(response => {
          // const destinationLat = response.data.results[0].geometry.location.lat;
          // const destinationLng = response.data.results[0].geometry.location.lng;
          const result = {
            destinationLat: parseFloat(destinationLat),
            destinationLng: parseFloat(destinationLng)
          };
          dispatch({ type: 'SET_DESTINATION', payload: result });
        // });
      })
      .catch(err => {
        dispatch({ type: 'SET_CURRENT_DISPATCH_FAILED', payload: err });
        console.log(err);
      });
  };
}
