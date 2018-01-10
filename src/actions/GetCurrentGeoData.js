export function getCurrenctGeoData(latitude, longitude) {
  return function(dispatch) {
    const geoObj = {
      // latitude: parseFloat(latitude),
      // longitude: parseFloat(longitude)
      latitude: latitude,
      longitude: longitude
    };
    dispatch({ type: 'SET_ORIGIN', payload: geoObj });
  };
}
